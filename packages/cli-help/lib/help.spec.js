import {test} from 'supertape';
import {help} from './help.js';

test('nirguna: cli-help', (t) => {
    const result = help();
    
    t.match(result, 'Usage');
    t.end();
});
