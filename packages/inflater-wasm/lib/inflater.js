import putout from 'putout';
import {tryCatch} from 'try-catch';
import * as reportByteRead from './report-byte-read/index.js';
import * as applyByteRead from './apply-byte-read/index.js';

const INFLATE = [
    ['apply-byte-read', applyByteRead],
    ['report-byte-read', reportByteRead],
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

const toPlace = ({message, position}) => ({
    message,
    position,
});

const toErrorPlace = ({message, loc}) => ({
    message,
    position: {
        line: loc.line,
        column: loc.column,
    },
});

export const inflate = (source) => {
    const [error, found] = tryCatch(putout, source, createFindOptions(INFLATE));
    
    if (error)
        return [source, [toErrorPlace(error)]];
    
    if (!found.places.length)
        return [source, []];
    
    const inflated = putout(source, createFixOptions(INFLATE));
    
    if (inflated.places.length)
        return [source, inflated.places.map(toPlace)];
    
    return [inflated.code, []];
};
