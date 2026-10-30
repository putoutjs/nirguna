import {run} from 'madrun';

export default {
    'wisdom': () => run(['lint', 'coverage']),
    'test': () => `tape 'lib/**/*.spec.*'`,
    'test:e2e': () => `tape 'e2e/*.*'`,
    'watch:test': async () => `nodemon -w lib -x "${await run('test')}"`,
    'lint': () => 'putout .',
    'fresh:lint': async () => await run('lint', '--fresh'),
    'lint:fresh': async () => await run('lint', '--fresh'),
    'fix:lint': async () => await run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test', "'e2e/*.*'")}`,
    'report': () => 'c8 report --reporter=lcov',
};
