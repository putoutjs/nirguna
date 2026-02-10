import {dirname, join} from 'node:path';
import {createRequire} from 'node:module';
import process from 'node:process';
import {tryCatch} from 'try-catch';
import {findUpSync as _findUpSync} from 'find-up-simple';

const {assign} = Object;
const require = createRequire(import.meta.url);

const NAME = '.nirguna.json';

export const parseConfig = (name, overrides = {}) => {
    const {
        cwd = process.cwd,
        readConfig = require,
        env = process.env,
        findUpSync = _findUpSync,
    } = overrides;
    
    const debug = env.DEBUG || false;
    const [error, options] = findConfig(name, {
        cwd,
        findUpSync,
        readConfig,
    });
    
    assign(options, {
        debug,
    });
    
    return [error, options];
};

function findConfig(name, {cwd, readConfig, findUpSync}) {
    const dir = dirname(name);
    const configPath = join(cwd(), dir, NAME);
    
    let [error, options = {}] = tryCatch(readConfig, configPath);
    
    if (error?.code === 'MODULE_NOT_FOUND') {
        const configPath = findUpSync(NAME, {
            cwd: join(cwd(), dir),
        });
        
        if (!configPath)
            return [null, { }];
        
        [error, options = {}] = tryCatch(readConfig, configPath);
        
        if (error?.code === 'MODULE_NOT_FOUND')
            return [null, { }];
    }
    
    return [error, options];
}
