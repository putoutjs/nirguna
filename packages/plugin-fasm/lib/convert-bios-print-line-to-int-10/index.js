import {operator, types} from 'putout';

const {isArrayExpression} = types;
const {extract} = operator;

export const report = () => `Use '0x10' instead of 'bios.printLine()'`;

export const replace = () => ({
    'bios.printLine()': `{
        ax = 0x1301;
        int(0x10);
    }`,
    'bios.printLine(__a, __object)': ({__object}) => {
        const {
            page = 0,
            color = 0,
            count = 0,
            line = 0,
            column = 0,
        } = parseArgs(__object.properties);
        
        return `{
            push(bp);
            bh = ${page};
            bl = ${color};
            cx = ${count};
            dh = ${line};
            dl = ${column}; 
            bp = __a;
            ax = 0x1301;
            int(0x10);
            pop(bp);
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
