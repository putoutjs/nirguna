import {operator, types} from 'putout';

const {isArrayExpression} = types;
const {extract} = operator;
const STDOUT = 1;

export const report = () => `Use 'syscall' instead of 'linux.write()'`;

export const match = () => ({
    'linux.write()': (vars, path) => {
        return path.parentPath.isExpressionStatement();
    },
});

export const replace = () => ({
    'linux.write(__object)': ({__object}) => {
        const {
            descriptor = STDOUT,
            message = 0,
            length = 0,
        } = parseArgs(__object.properties);
        
        return `{
            rdi = ${descriptor};
            rsi = ${message};
            rdx = ${length};
            rax = 1;
            syscall();
        }`;
    },
});

function parseArgs(properties) {
    const result = {};
    
    for (const {key, value} of properties) {
        const extracted = extract(value);
        
        if (isArrayExpression(value)) {
            result[key.name] = `[${extracted}]`;
            continue;
        }
        
        result[key.name] = extracted;
    }
    
    return result;
}
