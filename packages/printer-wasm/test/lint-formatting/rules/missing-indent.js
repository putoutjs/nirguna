export const report = () => 'missing indent';

export const check = (line, _next, {isFirstLine, isLastLine}) => {
    if (isFirstLine || isLastLine)
        return null;
    
    const rest = line.trimStart();
    
    if (rest === '')
        return null;
    
    if (rest !== line)
        return null;
    
    if (rest === ')')
        return null;
    
    return {
        index: 0,
    };
};
