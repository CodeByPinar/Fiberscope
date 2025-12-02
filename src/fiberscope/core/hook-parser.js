
/**
 * Hook Parser Engine
 * Extracts and identifies React Hooks from a Fiber node's memoizedState linked list.
 */

export function parseHooks(fiber) {
    // Only functional components have hooks in memoizedState
    // Tag 0 = Indeterminate, 1 = Functional (in some versions), 11 = ForwardRef
    // Usually we check if memoizedState exists and is a linked list structure
    if (!fiber || !fiber.memoizedState) return [];
    
    // Class components store state in memoizedState as an object, not a linked list of hooks.
    // We should check tag. Tag 1 is Class Component.
    if (fiber.tag === 1) {
        return [{
            id: 'state',
            type: 'Class State',
            value: fiber.memoizedState
        }];
    }

    const hooks = [];
    let currentHook = fiber.memoizedState;
    let index = 0;

    // Safety break to prevent infinite loops if structure is weird
    let safety = 0;

    while (currentHook && safety < 50) {
        let type = 'Hook';
        let value = currentHook.memoizedState;
        let details = null;

        // Heuristics to identify Hook Types
        // Note: React internals change. This is a best-effort guess for inspection.

        if (currentHook.queue) {
            // useState or useReducer
            // If queue.dispatch is exposed, it's likely state.
            type = 'State';
            
            // Sometimes value is the state itself.
        } else if (currentHook.memoizedState && typeof currentHook.memoizedState.create === 'function') {
            // useEffect / useLayoutEffect
            type = 'Effect';
            value = 'ƒ()';
            details = currentHook.memoizedState.deps || [];
        } else if (Array.isArray(currentHook.memoizedState) && currentHook.memoizedState.length === 2) {
            // useMemo or useCallback often look like [value, deps]
            type = 'Memo/Callback';
            value = currentHook.memoizedState[0];
            details = currentHook.memoizedState[1]; // deps
        } else if (currentHook.memoizedState && Object.prototype.hasOwnProperty.call(currentHook.memoizedState, 'current')) {
            // useRef
            type = 'Ref';
            value = currentHook.memoizedState.current;
        }

        hooks.push({
            id: index,
            type,
            value,
            details
        });

        currentHook = currentHook.next;
        index++;
        safety++;
    }

    return hooks;
}
