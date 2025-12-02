
/**
 * Tree Walker Engine
 * Generates a localized tree structure for visualization.
 */

function getComponentName(fiber) {
    if (!fiber) return 'null';
    if (typeof fiber.type === 'function') return fiber.type.displayName || fiber.type.name || 'Anonymous';
    if (typeof fiber.type === 'string') return fiber.type;
    if (fiber.tag === 11) return 'ForwardRef'; // ForwardRef
    if (fiber.tag === 0) return 'Indeterminate';
    return 'Node';
}

export function getLocalTree(fiber) {
    if (!fiber) return null;

    const tree = {
        name: getComponentName(fiber),
        tag: fiber.tag,
        isCurrent: true,
        fiber: fiber, // Reference for navigation
        children: []
    };

    // Get Children (Siblings of the first child)
    if (fiber.child) {
        let child = fiber.child;
        let safety = 0;
        while (child && safety < 20) { // Limit to 20 siblings for performance
            tree.children.push({
                name: getComponentName(child),
                tag: child.tag,
                isCurrent: false,
                hasChildren: !!child.child,
                fiber: child // Reference for navigation
            });
            child = child.sibling;
            safety++;
        }
        if (child) {
            tree.children.push({ name: '...', isMore: true });
        }
    }

    return tree;
}
