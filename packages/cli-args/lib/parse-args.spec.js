import {test} from 'supertape';
import {parseArgs} from './parse-args.js';

test('nirguna: cli-args: parse-args', (t) => {
    const result = parseArgs([
        '-o',
        'assembly',
        '-t',
        'fasm',
    ]);
    
    const expected = {
        _: [],
        o: 'assembly',
        output: 'assembly',
        t: 'fasm',
        target: 'fasm',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: cli-args: parse-args: quiet', (t) => {
    const result = parseArgs([
        '-o',
        'assembly',
        '-t',
        'fasm',
        '-q',
    ]);
    
    const expected = {
        _: [],
        o: 'assembly',
        output: 'assembly',
        t: 'fasm',
        target: 'fasm',
        q: true,
        quiet: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});
