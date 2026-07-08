import * as fasm from 'fasm.js';
import {dump} from './dump.js';

export const translate = async (source, options = {}) => {
    const {type} = options;
    const [binary, places] = await fasm.translate(source);
    
    if (type === 'dump')
        return [
            dump(source, binary),
            [],
        ];
    
    return [binary, places];
};
