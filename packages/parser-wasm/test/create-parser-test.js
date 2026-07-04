import {createTest as createPutoutTest} from '@putout/test';
import {parse} from '@putout/babel';
import {parse as convertWastToJs} from '#parser-wasm';

const noop = () => {};

const lint = (source) => {
    const code = convertWastToJs(source);
    
    parse(code);
    
    return {
        code,
        places: [],
    };
};

export const createTest = (url, options) => {
    return createPutoutTest(url, {
        extension: 'wast',
        extensionFix: 'js',
        lint,
        plugins: [
            ['markdown', {
                report: noop,
                replace: noop,
            }],
        ],
        ...options,
    });
};
