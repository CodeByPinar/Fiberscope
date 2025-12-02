
/**
 * Hierarchy Extraction System
 * Extracts the component tree lineage from a Fiber node.
 */
export function extractChain(fiberNode) {
  const chain = [];
  let current = fiberNode;

  while (current) {
    // We are interested in components (Function or Class) and Host components if needed
    // For the breadcrumb, we usually want user-defined components.
    
    const type = current.type;
    let name = "Unknown";

    if (typeof type === 'function') {
        name = type.displayName || type.name || "Anonymous";
    } else if (typeof type === 'string') {
        name = type; // e.g., 'div', 'span'
    } else if (current.tag === 0) { // IndeterminateComponent
        name = "Indeterminate";
    } else if (current.tag === 11) { // ForwardRef
        name = type.displayName || type.render?.displayName || type.render?.name || "ForwardRef";
    } else if (current.tag === 1) { // ClassComponent
        name = type.displayName || type.name || "ClassComponent";
    }

    // Filter out internal React nodes if desired, or keep them for full tree
    // The spec says: if (!display.startsWith("React") && display !== "HostRoot")
    
    const isHostRoot = current.tag === 3; // HostRoot
    
    if (name && !isHostRoot) {
        // We might want to filter out basic HTML tags for a cleaner "Component" view
        // or keep them. For now, let's keep everything but mark them.
        chain.push({
            name,
            type: typeof type === 'string' ? 'host' : 'component',
            fiber: current
        });
    }

    current = current.return;
  }

  return chain.reverse();
}
