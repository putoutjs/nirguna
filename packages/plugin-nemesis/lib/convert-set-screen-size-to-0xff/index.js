import {
    parseArgs,
    SET_MIN_MAX_COL_LINE,
} from '../api.js';

const {parse} = JSON;

export const report = () => `Use '0xff' instead of 'nemesis.setScreenSize()'`;

export const replace = () => ({
    'nemesis.setScreenSize(__a)': ({__a}) => {
        const {columns, lines} = parseArgs(__a);
        const [minColumn, maxColumn] = parse(columns);
        const [minLine, maxLine] = parse(lines);
        
        return `{
            cl = ${maxColumn};
            ch = ${maxLine};
            bl = ${minColumn};
        	bh = ${minLine};
            al = ${SET_MIN_MAX_COL_LINE};
            int(0xff);
        }`;
    },
});
