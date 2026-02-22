import {tryToCatch} from 'try-to-catch';

const addQuotes = (a) => `'${a}'`;
const targets = [
    'wasm',
    'fasm',
    'asm',
    'wast',
    'linux',
    'boot',
    'kernel',
    'nemesis',
].map(addQuotes);

export const validateArgs = async (args, {log, exit, stat}) => {
    if (!args._.length) {
        log('nirguna [options] [input]');
        return exit(1);
    }
    
    if (!args.target) {
        log(`'--target' is missing: ${targets.join(', ')}`);
        return exit(1);
    }
    
    const [name] = args._;
    const [error] = await tryToCatch(stat, name);
    
    if (error) {
        log(error.message);
        return exit(1);
    }
};
