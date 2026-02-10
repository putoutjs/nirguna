import {test, stub} from 'supertape';
import {prepare} from '#test-wasm';
import * as one from './1.wast.ts';

const preparedOne = prepare(one);

test('nirguna: wast: one', (t) => {
    const result = preparedOne.x(4, 6);
    
    t.deepEqual(result, 10);
    t.end();
});

test('nirguna: wast: one: imports', (t) => {
    const fn = stub();
    
    preparedOne.declareImport('console', 'log', fn);
    preparedOne.x(4, 6);
    preparedOne.undeclareImport('console', 'log');
    
    t.calledWithNoArgs(fn);
    t.end();
});
