
/**
 * Fiber Node Resolver
 * Finds the React Fiber node associated with a DOM element.
 */
export function resolveFiber(domElement) {
  if (!domElement) return null;

  // React stores the fiber node on the DOM element using a key starting with "__reactFiber"
  const key = Object.keys(domElement).find((k) => k.startsWith("__reactFiber"));
  
  return key ? domElement[key] : null;
}

/**
 * Helper to get the React Instance (often useful for state/props)
 */
export function resolveInstance(domElement) {
    if (!domElement) return null;
    const key = Object.keys(domElement).find((k) => k.startsWith("__reactInstance"));
    return key ? domElement[key] : null;
}
