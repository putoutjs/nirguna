import {join, dirname} from 'node:path';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {tryCatch} from 'try-catch';
import kebabCase from 'just-kebab-case';

const readFixture = (url, name) => {
    const __filename = fileURLToPath(url);
    const dir = dirname(__filename);
    
    const dirFixture = join(dir, 'fixture');
    const longName = join(dirFixture, name);
    const [e, data] = tryCatch(readFileSync, `${longName}.ts`, 'utf8');
    
    if (!e)
        return data;
    
    return readFileSync(`${longName}.js`, 'utf8');
};

export const readFixtures = (dir) => {
    return new Proxy({}, createHandler(dir));
};

const createHandler = (dir) => ({
    get(obj, prop) {
        return readFixture(dir, kebabCase(prop));
    },
});
