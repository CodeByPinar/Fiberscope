
/**
 * Fiber Metrics Engine
 * Extracts performance metrics, context dependencies, and flags from a Fiber node.
 */

export function getFiberMetrics(fiber) {
    if (!fiber) return null;

    // 1. Performance Metrics
    // actualDuration: Time spent rendering this fiber and its children for the current commit.
    // selfBaseDuration: Time spent rendering this fiber alone (estimated).
    const performance = {
        renderDuration: fiber.actualDuration ? fiber.actualDuration.toFixed(2) : '0.00',
        baseDuration: fiber.selfBaseDuration ? fiber.selfBaseDuration.toFixed(2) : '0.00',
    };

    // 2. Context Dependencies
    // fiber.dependencies is a linked list of contexts this fiber subscribes to.
    const contexts = [];
    let dep = fiber.dependencies;
    while (dep) {
        const ctx = dep.context;
        const name = ctx.displayName || 'AnonymousContext';
        // Try to find the current value
        const value = ctx._currentValue || ctx._currentValue2; // React internals vary
        
        contexts.push({
            name,
            value
        });
        dep = dep.next;
    }

    // 3. Flags (Side Effects)
    // React uses bitwise flags. We can check for common ones.
    // These constants might change between React versions, but some are stable.
    const flags = [];
    const f = fiber.flags || 0;
    
    if (f & 1) flags.push('Placement');
    if (f & 4) flags.push('Update');
    if (f & 16) flags.push('ChildDeletion');
    if (f & 128) flags.push('Ref');
    if (f & 512) flags.push('Snapshot');
    if (f & 1024) flags.push('Passive (Effect)');

    return {
        performance,
        contexts,
        flags
    };
}

export function logFiberToConsole(fiber) {
    console.group(`%c FiberScope: ${fiber.type?.displayName || fiber.type?.name || fiber.type || 'Component'}`, 'color: #a56fff; font-weight: bold;');
    console.log('Fiber Node:', fiber);
    console.log('State Node (Instance/DOM):', fiber.stateNode);
    console.log('Props:', fiber.memoizedProps);
    console.log('State (Memoized):', fiber.memoizedState);
    console.groupEnd();
}
