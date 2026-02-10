import {parseArgs, SET_CURSOR} from '../api.js';

export const report = () => `Use '0xff' instead of 'nemesis.setCursor'`;

export const replace = () => ({
    'nemesis.setCursor(__object)': ({__object}) => {
        const {column, line} = parseArgs(__object);
        
        return `{
            bl = ${column};
            bh = ${line};
            al = ${SET_CURSOR};
            int(0xff);
        }`;
    },
});
