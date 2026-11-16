import {inflate} from '@nirguna/inflater-wasm';
import {transform} from '@nirguna/transformer-wasm';
import {print as printCode} from '@nirguna/printer-wasm';
import {translate} from '@nirguna/translator-wasm';
import {createPipeline} from '#pipeline';
import {optimize} from '#optimizer-wasm';

function print(source) {
    return [
        printCode(source),
        [],
    ];
}

export const compile = createPipeline([
    inflate,
    transform,
    optimize,
    print,
    translate,
]);
