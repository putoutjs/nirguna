import {test} from 'supertape';
import montag from 'montag';
import {optimize} from '#optimizer-fasm';

test('nirguna: optimizer-fasm', (t) => {
    const [code] = optimize(`
        mov(eax, 1);
    `);
    
    const expected = montag`
        xor(eax, eax);
        inc(eax);\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('nirguna: optimizer-fasm: xor, mov', (t) => {
    const [code] = optimize(`
        xor(eax, eax);
        mov(eax, 1);
    `);
    
    const expected = montag`
        xor(eax, eax);
        inc(eax);\n
    `;
    
    t.equal(code, expected);
    t.end();
});
