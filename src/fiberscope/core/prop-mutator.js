
/**
 * Prop Mutator Engine
 * Handles the application of property changes to the live React Fiber tree and DOM.
 */

/**
 * Attempts to update a prop on a fiber node and reflect it in the UI.
 * Note: This is a best-effort approach for the prototype. 
 * True React state updates require changing the parent's state or source code.
 */
export function updateFiberProp(fiber, key, value) {
    if (!fiber) return;

    // 1. Update the fiber's memoizedProps (React's internal storage)
    // This doesn't trigger a re-render but updates the "read" value.
    if (fiber.memoizedProps) {
        // We need to clone to avoid reference issues if possible, but direct mutation is often needed for hot-patching
        fiber.memoizedProps = { ...fiber.memoizedProps, [key]: value };
    }
    
    if (fiber.pendingProps) {
        fiber.pendingProps = { ...fiber.pendingProps, [key]: value };
    }

    // 2. Visual Preview (DOM Manipulation)
    // Since we can't easily force a functional component to re-render with new props 
    // (because props come from parent), we cheat slightly for the "Preview" by modifying the DOM directly.
    
    const domNode = fiber.stateNode;
    if (domNode && domNode instanceof HTMLElement) {
        applyDomUpdate(domNode, key, value);
    } else if (fiber.child && fiber.child.stateNode instanceof HTMLElement) {
        // If fiber is a component, try to update its first child DOM node
        // This is heuristic and won't work for all cases (e.g. fragments)
        applyDomUpdate(fiber.child.stateNode, key, value);
    }
}

function applyDomUpdate(domNode, key, value) {
    // Handle Style
    if (key === 'style' && typeof value === 'object') {
        Object.assign(domNode.style, value);
        return;
    }

    // Handle ClassName
    if (key === 'className') {
        domNode.className = value;
        return;
    }

    // Handle Text Content (heuristic)
    // If the prop looks like content (children, label, text, title), try to update textContent
    // ONLY if the DOM node has a single text child or is empty to avoid wiping out structure.
    if (['children', 'text', 'label', 'title', 'content'].includes(key)) {
        if (typeof value === 'string' || typeof value === 'number') {
            // Check if it's safe to replace content
            if (domNode.children.length === 0) {
                domNode.textContent = value;
            } else {
                // If it has children, we might be destroying structure. 
                // For now, let's only update if it's a leaf-like node or we are sure.
                // Or, just set attribute if it's not 'children'
                if (key !== 'children') {
                     domNode.setAttribute(key, value);
                }
            }
        }
    }

    // Handle standard attributes
    if (typeof value === 'string' || typeof value === 'number') {
        try {
            domNode.setAttribute(key, value);
            // Also set property for inputs like 'value', 'checked'
            if (key in domNode) {
                domNode[key] = value;
            }
        } catch (e) {
            // Ignore invalid attributes
        }
    }
}
