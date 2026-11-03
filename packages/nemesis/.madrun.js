import {run} from 'madrun';

const SMALL_SIZE = 20_480;

const BUILD = [
    'nirguna -t kernel lib/kernel.ts',
    'nirguna -t boot lib/boot/index.js',
    'nirguna -t nemesis lib/shell/shell.ts',
    './scripts/build.js',
    'mkdir -p ~/nemesis-emulator',
    'cp ./build/* ~/nemesis-emulator/',
].join(' && ');

export default {
    'wisdom': () => run(['lint', 'coverage']),
    'test': () => `tape 'test/*.*' 'lib/**/*.spec.*'`,
    'watch:test': async () => `nodemon -w lib -x "${await run('test')}"`,
    'watch:build': async () => `nodemon -w . -e ts -x "${await run('build')}"`,
    'lint': () => 'putout .',
    'fresh:lint': async () => await run('lint', '--fresh'),
    'lint:fresh': async () => await run('lint', '--fresh'),
    'fix:lint': async () => await run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
    'build': () => `export NIRGUNA_FORMAT_SIZE=${SMALL_SIZE} && ${BUILD}`,
    'build:debug': () => `export DEBUG=2 && ${BUILD}`,
    'build:all': async () => await run(['build', 'build:debug']),
};
