import {GET_CHAR} from '../api.js';

export const report = () => `Use 'int(0xff)' instead of 'nemesis.getChar()'`;

export const replace = () => ({
    'nemesis.getChar()': `{
        al = ${GET_CHAR}
        int(0xff);
    }`,
});
