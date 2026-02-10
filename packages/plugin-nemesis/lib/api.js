import {operator, types} from 'putout';

const {isArrayExpression} = types;
const {extract} = operator;

export const GET_CHAR = 1;
export const PRINTF = 2;
export const FIND_FILE = 3;
export const FIND_FIRST = 5;
export const SET_COLOR = 6;
export const SET_CURSOR = 7;
export const GETS = 8;
export const SET_MIN_MAX_COL_LINE = 0xb;
export const READ_SECTOR = 0xc;

export function parseArgs({properties}) {
    const result = {};
    
    for (const {key, value} of properties) {
        const extracted = extract(value);
        
        if (isArrayExpression(value)) {
            result[key.name] = `[${extracted}]`;
            continue;
        }
        
        result[key.name] = extracted;
    }
    
    return result;
}
