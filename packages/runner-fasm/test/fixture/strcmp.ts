import {linux} from '@nirguna/operator-fasm';
import {strcmp} from './strcmp/strcmp.ts';

format.ELF64.executable;
segment.readable.executable;
entry.$;

let result: i64 = 0;

let a = 'hello';
let b = 'world';
let divider = '-';

let EQUAl = 'equal';
let NOT_EQUAl = 'not equal';

al = await strcmp(a, a);

if (!al)
    linux.write({
        message: EQUAl,
        length: 5,
    })

linux.write({
    message: divider,
    length: 1,
})

al = await strcmp(a, b);

if (al)
    linux.write({
        message: NOT_EQUAl,
        length: 9,
    })
    

linux.exit(0);

section: 'code';
segment.readable.writeable;
section: 'data';
