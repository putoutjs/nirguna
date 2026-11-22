import {test} from 'supertape';
import {defineBackend} from './define-backend.js';

const identity = (source) => [
    source,
    [],
];

const stages = [
    identity,
];

test('nirguna: define-backend: fields', (t) => {
    const backend = defineBackend({
        name: 'hello',
        options: ['target'],
        stages,
        targets: {},
    });
    
    const result = [backend.name, backend.options, backend.stages];
    const expected = [
        'hello',
        ['target'],
        stages,
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: define-backend: targets default is empty', (t) => {
    const {targets} = defineBackend({
        name: 'hello',
        options: [],
        stages,
    });
    
    const result = targets;
    const expected = {};
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: define-backend: compile runs the stages', async (t) => {
    const {compile} = defineBackend({
        name: 'hello',
        options: [],
        stages,
    });
    
    const [result] = await compile('a');
    
    t.equal(result, 'a');
    t.end();
});
