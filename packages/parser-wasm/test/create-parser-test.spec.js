import {test} from 'supertape';
import {noop} from './create-parser-test.js';

test('nirguna: parser-wasm: test: noop', (t) => {
    const result = noop();
    
    t.notOk(result);
    t.end();
});
