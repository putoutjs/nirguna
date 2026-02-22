import {run} from 'madrun';

export default {
    'prepublishOnly': () => run(['lint', 'test']),
    'test': () => `tape 'test/*.*' 'lib/**/*.spec.*'`,
    'watch:test': async () => `nodemon -w lib -x "${await run('test')}"`,
    'watch:build': async () => `nodemon -w . -e ts -x "${await run('build')}"`,
    'lint': () => 'putout .',
    'fresh:lint': async () => await run('lint', '--fresh'),
    'lint:fresh': async () => await run('lint', '--fresh'),
    'fix:lint': async () => await run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
    'build': () => {
        return [
            '../nirguna/bin/nirguna.js -t kernel lib/kernel.ts',
            '../nirguna/bin/nirguna.js -t boot lib/boot/index.js',
            '../nirguna/bin/nirguna.js -t nemesis lib/shell/shell.ts',
            './scripts/build.js',
            'cp ./build/* ~/nemesis-emulator/',
        ].join(' && ');
    },
    'build:debug': async () => [
        await run('build'), {
            DEBUG: '2',
        }],
    'build:all': async () => await run(['build', 'build:debug']),
};
