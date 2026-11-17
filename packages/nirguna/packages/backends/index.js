import {wasm} from '#backend-wasm';
import {fasm} from '#backend-fasm';

const COMMON = [
    'type',
    'stop',
    'optimization',
    'onStageChange',
];

export const TARGETS = new Map([
    ['wasm', {
        backend: wasm,
    }],
    ['wast', {
        backend: wasm,
        fixed: {
            type: 'assembly',
        },
    }],
]);

export const DEFAULT = {
    backend: fasm,
};

const pick = (options, names) => {
    const result = {};
    
    for (const name of names) {
        if (name in options)
            result[name] = options[name];
    }
    
    return result;
};

export const resolve = (options) => {
    const {backend, fixed} = TARGETS.get(options.target) || DEFAULT;
    
    return [
        backend, {
            ...pick(options, [...COMMON, ...backend.options]),
            ...fixed,
        },
    ];
};
