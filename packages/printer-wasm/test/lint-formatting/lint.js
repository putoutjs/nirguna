const isUndefined = (a) => typeof a === 'undefined';

export const lint = (text) => {
    const issues = [];
    const lines = text.split('\n');
    
    for (const [i, line] of lines.entries()) {
        const doubleSpace = line.match(/(?<=\S) {2,}/);
        
        if (doubleSpace)
            issues.push({
                line: i + 1,
                column: doubleSpace.index + 1,
                message: 'indent',
            });
        
        const trailingIndex = line.search(/[ \t]+$/);
        
        if (trailingIndex !== -1 && line.trim() !== '')
            issues.push({
                line: i + 1,
                column: trailingIndex + 1,
                message: 'trailing whitespace',
            });
    }
    
    for (const [i, line] of lines.entries()) {
        const next = lines[i + 1];
        
        if (isUndefined(next))
            continue;
        
        if (line.trim() === '' && next.trim() === '')
            issues.push({
                line: i + 1,
                column: 1,
                message: 'consecutive blank lines',
            });
    }
    
    return issues;
};

