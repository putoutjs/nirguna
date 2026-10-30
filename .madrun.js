import {run} from 'madrun';

const env = {
    SUPERC8_RESPONSIVE: 1,
};

export default {
    'wisdom': () => run(['lint', 'test:all']),
    'test': () => `tape 'packages/**/*.spec.js' 'packages/**/test/*.js'`,
    'test:e2e': () => `tape 'packages/**/e2e/*.{js,ts}'`,
    'test:all': async () => `${await run('test', 'externals/**/*.spec.ts')} && ${await run('test:e2e')}`,
    'watch:test': async () => `nodemon -w packages -w test -x "${await run('test')}"`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await run('test', "'packages/**/e2e/*.{js,ts}'")}`],
    'report': () => 'c8 report --reporter=lcov',
    'build:boot': () => run('build:boot:*'),
    'build:boot:fasm': () => nirguna({
        targets: ['fasm'],
        src: 'packages/nemesis/lib/boot/index.js',
    }),
    'build:boot:asm': () => nirguna({
        targets: ['asm'],
        src: 'packages/nemesis/lib/boot/index.js',
    }),
    'build:nemesis': () => run('build:nemesis:*'),
    'build:nemesis:asm': () => nirguna({
        targets: ['asm'],
        src: 'packages/nemesis/lib/kernel.ts',
    }),
    'build:nemesis:fasm': () => nirguna({
        targets: ['fasm'],
        src: 'packages/nemesis/lib/kernel.ts',
    }),
};

function nirguna({targets, src}) {
    const result = [];
    
    for (const target of targets) {
        const cmd = `./packages/nirguna/bin/nirguna.js -t ${target} ${src}`;
        result.push(cmd);
    }
    
    return result.join('&&');
}
