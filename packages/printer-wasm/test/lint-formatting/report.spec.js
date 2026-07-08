import {test} from 'supertape';
import {report} from './report.js';

test('report: no issues returns an empty string', (t) => {
    const fixturePath = '/tmp/export-marker-fix.wast';
    const message = report(fixturePath, '', []);
    
    t.equal(message, '');
    t.end();
});

test('report: single issue includes a clickable file:line:column url', (t) => {
    const fixturePath = '/tmp/export-marker-fix.wast';
    const message = report(fixturePath, '', [{
        line: 2,
        column: 27,
        message: 'double space',
    }]);
    
    t.match(message, 'file:///tmp/export-marker-fix.wast:2:27');
    t.end();
});

test('report: single issue includes a code frame pointing at the source', (t) => {
    const fixturePath = '/tmp/export-marker-fix.wast';
    const message = report(fixturePath, '', [{
        line: 2,
        column: 27,
        message: 'double space',
    }]);
    
    const expected = `${fixturePath}:2:27`;
    
    t.match(message, expected);
    t.end();
});

test('report: multiple issues are separated by a blank line', (t) => {
    const fixturePath = '/tmp/export-marker-fix.wast';
    const message = report(fixturePath, '', [{
        line: 2,
        column: 27,
        message: 'double space',
    }, {
        line: 3,
        column: 1,
        message: 'trailing whitespace',
    }]);
    const parts = message.split('\n\n');
    
    t.equal(parts.length, 2);
    t.end();
});
