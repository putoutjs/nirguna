import {GETS, parseArgs} from '../api.js';

export const report = () => `Use '0xff' instead of 'nemesis.gets()'`;

export const replace = () => ({
    'nemesis.gets(__a)': ({__a}) => {
        const {buffer, size} = parseArgs(__a);
        
        return `{
            bx = ${buffer};
            cx = ${size};
            al = ${GETS};
            int(0xff);
        }`;
    },
});
