const OPERATOR = {
    '===': 'jz',
    '!==': 'jnz',
    '>': 'jg',
    '<': 'jl',
    '<=': 'jle',
    '>=': 'jge',
};

const OPERATOR_REVERSE = {
    '===': 'jnz',
    '!==': 'jz',
    '>': 'jle',
    '<': 'jge',
    '<=': 'jg',
    '>=': 'jl',
};

export function parseOperator(operator, {direct = false}) {
    const customOperator = direct ? OPERATOR : OPERATOR_REVERSE;
    const result = customOperator[operator];
    
    if (!result)
        throw Error(`☝️Looks like operator '${operator}' not supported`);
    
    return result;
}
