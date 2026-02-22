import {getStringLength} from './string/get-string-length.ts';

format.ELF64.executable;
segment.readable.executable;
entry.$;

section: 'const';

let message = ['Hello 64-bit world!', 0xA];

rdx = await getStringLength(message);

linux.write({
    message,
    length: rdx,
});

linux.exit(0);

section: 'code';

segment.readable.writeable;
section: 'data';
