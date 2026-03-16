import {operator} from 'putout';

const {extract} = operator;
const STDOUT = 1;

export const report = () => `Use 'syscall' instead of 'linux.write()'`;

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
        result[key.name] = extract(value);
    }
    
    return result;
}
