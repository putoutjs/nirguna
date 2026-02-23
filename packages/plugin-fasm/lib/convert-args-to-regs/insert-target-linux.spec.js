import {createTest} from '@putout/test';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as plugin from './index.js';
import * as insertTarget from '../insert-target/index.js';
import * as convertAssignToAdd from '../convert-assign-to-add/index.js';
import * as convertAssignToMov from '../convert-assign-to-mov/index.js';
import * as splitBinaryExpression from '../split-binary-expression/index.js';
import * as convertFunctionToLabel from '../convert-function-to-label/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'insert-target': ['on', {
            target: 'linux',
        }],
    },
    plugins: [
        ['convert-args-to-regs', plugin],
        ['insert-target', insertTarget],
    ],
});

test('fasm: convert-args-to-regs: transform: insert-target-linux', (t) => {
    t.transform('insert-target-linux', {
        convertAssignToAdd,
        convertAssignToMov,
        splitBinaryExpression,
        removeNestedBlocks,
        convertFunctionToLabel,
    });
    t.end();
});
