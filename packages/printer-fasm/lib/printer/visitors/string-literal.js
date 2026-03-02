export const StringLiteral = (path, {write}) => {
    const {value, raw = `'${value}'`} = path.node;
    const newValue = raw.slice(1, -1);
    
    write.quote();
    write(maybeEscape(newValue));
    write.quote();
};

const maybeEscape = (value) => {
    const list = value.split('');
    const slash = '\\';
    
    return escape(list, {
        slash,
        quote: `'`,
    });
};

const escape = (list, {slash, quote}) => {
    const result = [];
    
    for (const [index, char] of list.entries()) {
        const next = list[index + 1];
        
        if (char === slash && next === quote) {
            result.push(quote);
            continue;
        }
        
        result.push(char);
    }
    
    return result.join('');
};
