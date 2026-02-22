import {run} from 'madrun';

export default {
    'wisdom': () => run(['lint', 'test:all']),
    'test': () => `tape 'lib/**/*.js' 'packages/**/*.spec.js' 'packages/**/test/*.js' 'example/**/*.spec.ts'`,
    'test:all': () => run('test', 'externals/**/*.spec.ts'),
    'watch:test': async () => `nodemon -w packages -w test -x "${await run('test')}"`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
    'build:boot': () => run('build:boot:*'),
    'build:boot:fasm': () => nirguna({
        targets: ['boot'],
        src: 'externals/nemesis/lib/boot/index.js',
    }),
    'build:boot:asm': () => nirguna({
        targets: ['asm'],
        src: 'externals/nemesis/lib/boot/index.js',
    }),
    'build:nemesis': () => run('build:nemesis:*'),
    'build:nemesis:asm': () => nirguna({
        targets: ['asm'],
        src: 'externals/nemesis/lib/kernel.ts',
    }),
    'build:nemesis:fasm': () => nirguna({
        targets: ['kernel'],
        src: 'externals/nemesis/lib/kernel.ts',
    }),
};

function nirguna({targets, src}) {
    const result = [];
    
    for (const target of targets) {
        const cmd = `./bin/nirguna.js -t ${target} ${src}`;
        result.push(cmd);
    }
    
    return result.join('&&');
}
