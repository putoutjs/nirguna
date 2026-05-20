import {run} from 'madrun';

const env = {
    //    SUPERC8_RESPONSIVE: 1,
};

export default {
    'prepublishOnly': () => run(['lint', 'test']),
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': async () => `nodemon -w lib -x "${await run('test')}"`,
    'lint': () => 'putout .',
    'fresh:lint': async () => await run('lint', '--fresh'),
    'lint:fresh': async () => await run('lint', '--fresh'),
    'fix:lint': async () => await run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await run('test')}`],
    'coverage:escover': async () => [env, `escover "${await run('test')}"`],
    'report': () => 'c8 report --reporter=lcov',
};
