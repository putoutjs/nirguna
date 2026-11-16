import {inflate} from '@nirguna/inflater-fasm';
import {transform as transformCode} from '@nirguna/transformer-fasm';
import {print as printCode} from '@nirguna/printer-fasm';
import {translate} from '@nirguna/translator-fasm';
import {createPipeline} from '#pipeline';
import {optimize} from '#optimizer-fasm';

function transform(source, {config, target = 'fasm'}) {
    return transformCode(source, {
        ...config,
        target,
    });
}

function print(source) {
    return [
        printCode(source),
        [],
    ];
}

const run = createPipeline([
    inflate,
    transform,
    optimize,
    print,
    translate,
]);

const toOptions = (options) => {
    if (options.target === 'asm')
        return {
            ...options,
            type: 'assembly',
        };
    
    return options;
};

export const compile = (source, options = {}) => run(source, toOptions(options));
