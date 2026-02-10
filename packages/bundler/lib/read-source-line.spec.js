import {test, stub} from 'supertape';
import montag from 'montag';
import {readSourceLine} from './read-source-line.js';

test('nirguna: bundler: readSourceLine', async (t) => {
    const source = montag`
        if (a) {
            const a = 5;
            const b = 3;
        }
    `;
    
    const readSourceFile = stub().resolves(source);
    const result = await readSourceLine('hello', 3, {
        readSourceFile,
    });
    
    const expected = 'const b = 3;';
    
    t.equal(result, expected);
    t.end();
});
