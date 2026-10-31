import {Buffer} from 'node:buffer';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {bundle} from '@nirguna/bundler';
import {parseConfig} from '@nirguna/cli-args';
import {format} from '@nirguna/format-floppy';
import {compile} from 'nirguna';

const nemesisDir = fileURLToPath(new URL('../..', import.meta.url));
const cache = new Map();

const PROGRAMS = [
    ['boot', 'lib/boot/index.js'],
    ['kernel', 'lib/kernel.ts'],
    ['nemesis', 'lib/shell/shell.ts'],
];

const getCwd = () => nemesisDir;
const getMessage = ({message}) => message;

const fail = (input, message) => {
    throw Error(`nemesis: build: ${input}: ${message}`);
};

const compileProgram = async ({target, input, debug}) => {
    const [configError, config] = parseConfig(input, {
        cwd: getCwd,
        env: {
            DEBUG: debug,
        },
    });
    
    if (configError)
        fail(input, configError.message);
    
    const name = join(nemesisDir, input);
    const [bundleError, source] = await bundle(name, config);
    
    if (bundleError)
        fail(input, bundleError.message);
    
    const [binary, places] = await compile(source, {
        name,
        target,
        type: 'binary',
        optimization: true,
        config,
    });
    
    if (places.length)
        fail(
            input,
            places
                .map(getMessage)
                .join(', '),
        );
    
    return Buffer.from(binary);
};

const buildPrograms = async (debug) => {
    const binaries = [];
    
    for (const [target, input] of PROGRAMS)
        binaries.push(await compileProgram({
            target,
            input,
            debug,
        }));
    
    return binaries;
};

const buildFloppy = async ({debug, size}) => {
    const [boot, kernel, shell] = await buildPrograms(debug);
    
    return await format({
        boot,
        files: {
            'kernel.bin': kernel,
            'sh3ll.bin': shell,
        },
        size,
        env: {},
    });
};

export const getFloppy = (overrides = {}) => {
    const {debug = '', size} = overrides;
    const key = `${debug}:${size}`;
    
    if (!cache.has(key))
        cache.set(key, buildFloppy({
            debug,
            size,
        }));
    
    return cache.get(key);
};
