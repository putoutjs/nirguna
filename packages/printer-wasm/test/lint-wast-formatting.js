const isUndefined = (a) => typeof a === 'undefined';

export const lintWastFormatting = (text) => {
    const issues = [];
    const lines = text.split('\n');
    
    for (const [i, line] of lines.entries()) {
        const n = i + 1;
        const body = line.replace(/^\s+/, '');
        
        if (/ {2,}\S/.test(body))
            issues.push(`line ${n}: double space`);
        
        if (/[ \t]+$/.test(line) && line.trim() !== '')
            issues.push(`line ${n}: trailing whitespace`);
    }
    
    for (const [i, line] of lines.entries()) {
        const next = lines[i + 1];
        
        if (isUndefined(next))
            continue;
        
        if (line.trim() === '' && next.trim() === '')
            issues.push(`line ${i + 1}: consecutive blank lines`);
    }
    
    return issues;
};
