import {test} from 'supertape';
import {tryCatch} from 'try-catch';
import {readFixtures} from '../lib/fixture.js';

const fixtures = readFixtures(import.meta.url);

test('nirguna: test: readFixtures: ts', (t) => {
    t.equal(fixtures.helloWorld, 'hello world\n');
    t.end();
});

test('nirguna: test: readFixtures: js', (t) => {
    t.equal(fixtures.plain, 'plain text\n');
    t.end();
});

test('nirguna: test: readFixtures: no such fixture', (t) => {
    const [error] = tryCatch(() => fixtures.missing);
    
    t.equal(error.code, 'ENOENT');
    t.end();
});
