import {readFile} from 'node:fs/promises';

export const readSourceLine = async (name, line, {readSourceFile = readFile} = {}) => {
    const source = await readSourceFile(name, 'utf8');
    const lines = source.split('\n');
    
    return lines[line - 1].trim();
};
