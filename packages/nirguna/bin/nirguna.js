#!/usr/bin/env node

import {writeFileSync} from 'node:fs';
import process, {cwd, exit} from 'node:process';
import {stat} from 'node:fs/promises';
import path, {join} from 'node:path';
import {codeFrameColumns} from '@putout/babel';
import chalk from 'chalk';
import {bundle} from '@nirguna/bundler';
import {prepareError} from '@nirguna/bundler/prepare-error';
import {help} from '@nirguna/cli-help';
import {
    parseArgs,
    validateArgs,
    parseConfig,
} from '@nirguna/cli-args';
import {compile} from 'packages/nirguna/lib/nirguna.spec.js';

debugger;
const onStageChange = (args) => (stage, {last, places}) => {
    const line = stage[0].toUpperCase() + stage.slice(1);
    
    log(args, '✅ \n');
    log(args, line, {
        withDivider: true,
    });
    
    if (!last)
        return;
    
    if (!places.length) {
        log(args, '✅ \n\n');
        return;
    }
    
    log(args, '❌ \n\n');
    
    const fullName = join(cwd(), name);
    
    for (const {message, position} of places) {
        const {line, column} = position;
        
        if (stage === 'translate') {
            console.error(`${chalk.blue(`${line}:${column}`)}: ${chalk.red(message)}`);
            continue;
        }
        
        console.error(`file://${chalk.blue(`${fullName}:${line}:${column}`)}: ${chalk.red(message)}`);
    }
    
    exit(1);
};

const {O = 1, RAW} = process.env;
const args = parseArgs(process.argv.slice(2));

if (args.help) {
    console.log(help());
    process.exit(0);
}

await validateArgs(args, {
    log: (a) => console.error(chalk.red(a)),
    exit: process.exit,
    stat,
});

const [name] = args._;

const [errorOptions, config] = parseConfig(name);

if (errorOptions) {
    console.error(errorOptions);
    process.exit(1);
}

log(args, `🔎 ${name}\n`);
log(args, `🚀 ${args.target}\n\n`);

log(args, 'Bundle', {
    withDivider: true,
});

const [error, source] = await bundle(name, config);

if (error) {
    console.log(error);
    
    if (!error.id) {
        console.error(error.message);
        process.exit(1);
    }
    
    if (error.code === 'UNRESOLVED_IMPORT') {
        console.error(`file://${chalk.blue(error.id)}: ${chalk.red(error.message)}`);
        process.exit(1);
    }
    
    const {message} = await prepareError(error);
    
    const {line} = error.location?.start || error.loc;
    const name = error.id || error.fileName;
    
    console.error(`file://${chalk.blue(name)}:${line}: ${chalk.red(message)}`);
    process.exit(1);
}

if (/bundled?/.test(args.output)) {
    log(args, `✅ \n\n`);
    
    if (RAW)
        console.log(source);
    else
        console.log(codeFrameColumns(source, {}, {
            highlightCode: true,
            forceColor: true,
        }));
    
    process.exit();
}

const [binary] = await compile(source, {
    name,
    type: args.output,
    target: args.target,
    optimization: Boolean(Number(O)),
    config,
    onStageChange: onStageChange(args),
});

if (args.output) {
    if (args.output === 'binary' || RAW)
        process.stdout.write(binary);
    else
        console.log(codeFrameColumns(String(binary), {}, {
            highlightCode: true,
            forceColor: true,
        }));
    
    process.exit();
}

if (!args.output)
    if (args.target === 'fasm')
        write(name, 'bin', binary);
    else if (args.target === 'wasm')
        write(name, 'wasm', binary);

if (args.target === 'wast')
    write(name, 'wast', binary);
else if (args.target === 'asm')
    write(name, 'asm', binary);

process.exit(0);

function write(input, extension, binary) {
    const {dir, name} = path.parse(input);
    const full = `${join(dir, name)}.${extension}`;
    
    writeFileSync(full, binary);
    log(args, `💾 ${full}\n\n`);
}

function log({quiet}, message, {withDivider} = {}) {
    if (quiet)
        return;
    
    process.stdout.write(message);
    
    if (withDivider) {
        const divider = Array(35 - message.length).join('.');
        process.stdout.write(divider);
    }
}
