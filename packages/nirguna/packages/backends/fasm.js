import {inflate} from '@nirguna/inflater-fasm';
import {transform as transformCode} from '@nirguna/transformer-fasm';
import {print as printCode} from '@nirguna/printer-fasm';
import {translate} from '@nirguna/translator-fasm';
import {check} from '@nirguna/checker-fasm';
import {optimize} from '@nirguna/optimizer-fasm';
import {printStage} from '#pipeline';
import {defineBackend} from './define-backend.js';

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

const toOptions = (options) => {
    if (options.target === 'asm')
        return {
            ...options,
            type: 'assembly',
        };
    
    return options;
};

const backend = defineBackend({
    name: 'fasm',
    options: ['target', 'config'],
    stages,
});

const compile = (source, options = {}) => backend.compile(source, toOptions(options));

export const fasm = {
    ...backend,
    compile,
};
