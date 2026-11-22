import putout from 'putout';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as fasm from '@nirguna/plugin-optimizer-fasm';

export const optimize = (source) => {
    const {code, places} = putout(source, {
        isTS: true,
        plugins: [
            ['nirguna/optimizer-fasm', fasm],
            ['remove-nested-blocks', removeNestedBlocks],
        ],
    });
    
    return [code, places];
};
