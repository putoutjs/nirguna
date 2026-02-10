export const report = () => `Use 'int(0xff)' instead of 'nemesis.printf()'`;

import {PRINTF} from '../api.js';

export const replace = () => ({
    'nemesis.printf(__a)': `{
        al = ${PRINTF}
        bx = __a;
        int(0xff);
    }`,
});
