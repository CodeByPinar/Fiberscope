
/**
 * Code Generator Engine
 * Reconstructs JSX code from the current component state and props.
 */

export function generateCodeSnippet(componentName, props) {
    if (!componentName) return '';

    let code = `<${componentName}`;
    const propStrings = [];

    for (const [key, value] of Object.entries(props)) {
        // Skip internal React props or empty children if handled separately
        if (key === 'children') continue; 
        
        if (value === undefined || value === null) continue;

        if (typeof value === 'string') {
            propStrings.push(`${key}="${value}"`);
        } else if (typeof value === 'number' || typeof value === 'boolean') {
            propStrings.push(`${key}={${value}}`);
        } else if (typeof value === 'object') {
            // Simple object serialization for style or other objects
            try {
                propStrings.push(`${key}={${JSON.stringify(value)}}`);
            } catch (e) {
                propStrings.push(`${key}={...}`);
            }
        } else if (typeof value === 'function') {
            // We can't easily serialize functions, so we just put a placeholder
            // or skip it if we want clean output for copy-paste
            // propStrings.push(`${key}={func}`); 
        }
    }

    // Handle children
    const children = props.children;
    const hasProps = propStrings.length > 0;
    
    if (hasProps) {
        code += '\n  ' + propStrings.join('\n  ');
    }

    if (children && typeof children === 'string') {
        code += hasProps ? '\n>' : '>';
        code += `\n  ${children}\n`;
        code += `</${componentName}>`;
    } else if (children && Array.isArray(children)) {
         code += hasProps ? '\n>' : '>';
         code += `\n  {/* ...nested children... */}\n`;
         code += `</${componentName}>`;
    } else {
        code += hasProps ? '\n/>' : ' />';
    }

    return code;
}
