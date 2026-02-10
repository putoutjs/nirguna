import {test} from 'supertape';
import montag from 'montag';
import {translate} from '#translator-fasm';

test('nirguna: translator-fasm', async (t) => {
    const [result] = await translate(`
        xor eax, eax
    `);
    
    const expected = new Uint8Array([0x66, 0x31, 0xc0]);
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: translator-fasm: places', async (t) => {
    const [, places] = await translate(`
        (module)
    `);
    
    const expected = [{
        message: `illegal instruction: '(module)'`,
        position: {
            column: 0,
            line: 2,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('nirguna: translator-fasm: dump', async (t) => {
    const source = 'mov eax, ecx';
    const [, places] = await translate(source, {
        type: 'dump',
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('nirguna: translator-fasm: dump: use32', async (t) => {
    const source = montag`
        use32;
        mov eax, ecx
    `;
    
    const [result] = await translate(source, {
        type: 'dump',
    });
    
    t.match(result, '89C8');
    t.end();
});
