import {inflate} from '@nirguna/inflater-fasm';
import {transform as transformCode} from '@nirguna/transformer-fasm';
import {print as printCode} from '@nirguna/printer-fasm';
import {translate} from '@nirguna/translator-fasm';
import {check} from '@nirguna/checker-fasm';
import {optimize} from '@nirguna/optimizer-fasm';
import {createPipeline, printStage} from '#pipeline';

function transform(source, {config, target = 'fasm'}) {
    return transformCode(source, {
        ...config,
        target,
    });
}

const stages = [
    inflate,
    transform,
    check,
    optimize,
    printStage(printCode),
    translate,
];

const run = createPipeline(stages);

const toOptions = (options) => {
    if (options.target === 'asm')
        return {
            ...options,
            type: 'assembly',
        };
    
    return options;
};

const compile = (source, options = {}) => run(source, toOptions(options));

export const fasm = {
    name: 'fasm',
    stages,
    options: ['target', 'config'],
    compile,
};
