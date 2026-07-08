export const report = () => 'trailing whitespace';
export const check = (line) => {
    const trailingIndex = line.search(/[ \t]+$/);
    
    if (trailingIndex === -1)
        return null;
    
    if (line.trim() === '')
        return null;
    
    return {
        index: trailingIndex,
    };
};
