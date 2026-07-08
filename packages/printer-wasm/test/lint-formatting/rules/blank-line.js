const isUndefined = (a) => typeof a === 'undefined';

export const report = () => 'consecutive blank lines';

export const check = (line, next) => {
    if (isUndefined(next))
        return null;
    
    if (line.trim() !== '')
        return null;
    
    if (next.trim() !== '')
        return null;
    
    return {
        index: 0,
    };
};

