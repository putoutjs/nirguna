import {inflate} from '@nirguna/inflater-wasm';
import {transform} from '@nirguna/transformer-wasm';
import {print as printCode} from '@nirguna/printer-wasm';
import {translate} from '@nirguna/translator-wasm';
import {check} from '@nirguna/checker-wasm';
import {optimize} from '@nirguna/optimizer-wasm';
import {createPipeline, printStage} from '#pipeline';

const stages = [
    inflate,
    transform,
    check,
    optimize,
    printStage(printCode),
    translate,
];

export const wasm = {
    name: 'wasm',
    stages,
    options: ['name'],
    compile: createPipeline(stages),
};
