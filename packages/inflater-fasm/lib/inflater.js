import putout from 'putout';
import {tryCatch} from 'try-catch';
import * as analyzeRegisters from './analyze-registers/index.js';
import * as applyRegisters from './apply-registers/index.js';

const ANALYZE = [
    ['analyze-registers', analyzeRegisters],
];

const INFLATE = [
    ['analyze-registers', analyzeRegisters],
    ['apply-registers', applyRegisters],
];

const createFindOptions = (plugins) => ({
    isTS: true,
    fix: false,
    plugins,
});

const createFixOptions = (plugins) => ({
    isTS: true,
    fix: true,
    plugins,
});

const toPlace = ({message, loc}) => ({
    message,
    position: {
        line: loc.line,
        column: loc.column,
    },
});

export const inflate = (source) => {
    const [error, found] = tryCatch(putout, source, createFindOptions(ANALYZE));
    
    if (error)
        return [
            source,
            [
                toPlace(error),
            ],
        ];
    
    if (!found.places.length)
        return [
            source,
            [],
        ];
    
    const inflated = putout(source, createFixOptions(INFLATE));
    
    return [inflated.code, inflated.places];
};
