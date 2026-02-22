import {readFileSync as _readFileSync} from 'node:fs';
import putout from 'putout';
import * as removeUselessOperand from '@putout/plugin-remove-useless-operand';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as fasm from '@nirguna/plugin-fasm';
import * as nirguna from '@nirguna/plugin-nirguna';
import * as bundler from '@nirguna/plugin-bundler-fasm';

const defaultConfig = {
    rules: {},
    plugins: [],
};

const parseConfig = (config) => ({
    ...defaultConfig,
    ...config,
});

export const transform = (source, config) => {
    const {
        debug,
        plugins,
        rules,
        readFileSync = _readFileSync,
    } = parseConfig(config);
    
    const variables = [];
    const functions = [];
    
    const {code: bundled} = putout(source, {
        isTS: true,
        rules: {
            'nirguna/bundler-fasm/apply-debug': ['on', {
                debug,
                count: 0,
                variables,
                functions,
            }],
            'nirguna/bundler-fasm/replace-section-data-with-let': ['on', {
                variables,
            }],
            'nirguna/bundler-fasm/replace-section-code-with-functions': ['on', {
                functions,
            }],
        },
        plugins: [
            ['nirguna/bundler-fasm', bundler],
        ],
    });
    
    const {code, places} = putout(bundled, {
        fixCount: 5,
        isTS: true,
        rules: {
            ...rules,
            'nirguna/fasm/apply-include': ['on', {
                readFileSync,
            }],
        },
        plugins: [
            ...plugins,
            ['remove-useless-operand', removeUselessOperand],
            ['remove-nested-blocks', removeNestedBlocks],
            ['nirguna/nirguna', nirguna],
            ['nirguna/fasm', fasm],
        ],
    });
    
    return [code, places];
};
