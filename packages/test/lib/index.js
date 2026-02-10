import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {extend} from 'supertape';
import {compileExtension} from './compile-extension.js';

export const createTest = (url, {run, target, config, dir = 'fixture'}) => {
    const __filename = fileURLToPath(url);
    const currentDir = dirname(__filename);
    const dirFixture = join(currentDir, dir);
    
    const test = extend({
        compile: compileExtension(dirFixture, {
            run,
            target,
            config,
        }),
    });
    
    return {
        test,
    };
};
