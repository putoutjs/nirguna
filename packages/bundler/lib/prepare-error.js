import {readSourceLine} from './read-source-line.js';

const {assign} = Object;
const defaultLoc = {
    line: 0,
};

export const prepareError = async (error) => {
    const {id, loc = defaultLoc} = error;
    
    if (!id) {
        assign(error, {
            loc,
        });
        return error;
    }
    
    const line = loc.line + 1;
    const sourceLine = await readSourceLine(id, line);
    const message = error.message.replace('.', `: '${sourceLine}'`);
    
    return assign(error, {
        message,
    });
};
