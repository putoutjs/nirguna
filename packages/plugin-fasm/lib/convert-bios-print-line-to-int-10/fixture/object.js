import {bios} from '@nirguna/operator-fasm';

const str = 'hello';

bios.printLine(str, {
    line: [line],
    column: 0,
    page: 0,
    color: 2,
});
