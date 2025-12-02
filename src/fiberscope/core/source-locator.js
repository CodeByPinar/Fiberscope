
/**
 * Source Location Engine
 * Extracts file, line, and column info from React Fiber debug sources.
 */
export function getSourceLocation(fiberNode) {
    if (!fiberNode || !fiberNode._debugSource) {
        return null;
    }

    const { fileName, lineNumber, columnNumber } = fiberNode._debugSource;

    return {
        file: fileName,
        line: lineNumber,
        column: columnNumber
    };
}
