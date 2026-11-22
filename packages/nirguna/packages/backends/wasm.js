import {inflate} from '@nirguna/inflater-wasm';
import {transform} from '@nirguna/transformer-wasm';
import {print as printCode} from '@nirguna/printer-wasm';
import {translate} from '@nirguna/translator-wasm';
import {check} from '@nirguna/checker-wasm';
import {optimize} from '@nirguna/optimizer-wasm';
import {printStage} from '#pipeline';
import {defineBackend} from './define-backend.js';

const stages = [
    inflate,
    transform,
    check,
    optimize,
    printStage(printCode),
    translate,
];

export const wasm = defineBackend({
    name: 'wasm',
    options: ['name'],
    stages,
    targets: {
        wasm: {},
        wast: {
            type: 'assembly',
        },
    },
});
