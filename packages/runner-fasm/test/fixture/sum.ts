import {linux} from '@nirguna/operator-fasm';
import {sum} from './sum/sum.ts';

format.ELF64.executable;
segment.readable.executable;
entry.$;

let result: i64 = 0;

rax = await sum(1, 2);

rax += 0x30;
[result] = rax;

linux.write({
    message: result,
    length: 1,
})

linux.exit(0);

section: 'code';
segment.readable.writeable;
section: 'data';
