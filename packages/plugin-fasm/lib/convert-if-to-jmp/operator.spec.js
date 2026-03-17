import {tryCatch} from 'try-catch';
import {test} from 'supertape';
import {parseOperator} from './operator.js';

test('@nirguna/plugin-fasm: convert-if-to-jmp: operator', (t) => {
    const [error] = tryCatch(parseOperator, 'x');
    
    t.equal(error.message, `☝️Looks like operator 'x' is not supported`);
    t.end();
});
