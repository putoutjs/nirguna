import {inflate} from '@nirguna/inflater-wasm';
import {transform} from '@nirguna/transformer-wasm';
import {print as printCode} from '@nirguna/printer-wasm';
import {translate} from '@nirguna/translator-wasm';
import {check} from '@nirguna/checker-wasm';
import {optimize} from '@nirguna/optimizer-wasm';
import {createPipeline} from '#pipeline';

function print(source) {
    return [
        printCode(source),
        [],
    ];
}

const stages = [
    inflate,
    transform,
    check,
    optimize,
    print,
    translate,
];

export const wasm = {
    name: 'wasm',
    stages,
    options: ['name'],
    compile: createPipeline(stages),
};
