import {test} from 'supertape';
import {montag} from 'montag';
import {check} from './missing-indent.js';

test('missing-indent: flags an unindented line', (t) => {
    const result = check('(memory 1)', '', {
        isFirstLine: false,
        isLastLine: false,
    });
    
    const expected = {
        index: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('missing-indent: first line is exempt', (t) => {
    const position = check('(module', '', {
        isFirstLine: true,
        isLastLine: false,
    });
    
    t.notOk(position);
    t.end();
});

test('missing-indent: last line is exempt', (t) => {
    const position = check(')', '', {
        isFirstLine: false,
        isLastLine: true,
    });
    
    t.notOk(position);
    t.end();
});

test('missing-indent: blank line is not flagged', (t) => {
    const position = check('', '', {
        isFirstLine: false,
        isLastLine: false,
    });
    
    t.notOk(position);
    t.end();
});

test('missing-indent: correctly indented line passes', (t) => {
    const position = check('    (memory 1)', '', {
        isFirstLine: false,
        isLastLine: false,
    });
    
    t.notOk(position);
    t.end();
});

test('missing-indent: lone closing line passes', (t) => {
    const position = check(')', '', {
        isFirstLine: false,
        isLastLine: false,
    });
    
    t.notOk(position);
    t.end();
});

test('missing-indent: tab-indented line passes', (t) => {
    const position = check('\t(memory 1)', '', {
        isFirstLine: false,
        isLastLine: false,
    });
    
    t.notOk(position);
    t.end();
});

test('missing-indent: flags chained markers without indent', (t) => {
    const buggy = montag`
        (module
            (table 1 2 anyfunc)
        (memory 1)
        (export "x" (func $x))
            (func $x)
        )
    `;
    
    const lines = buggy.split('\n');
    const issues = [];
    
    for (const [i, line] of lines.entries()) {
        const position = check(line, lines[i + 1], {
            isFirstLine: !i,
            isLastLine: i === lines.length - 1,
        });
        
        if (position)
            issues.push(i + 1);
    }
    
    t.deepEqual(issues, [3, 4]);
    t.end();
});

test('missing-indent: flags elem followed by unindented table', (t) => {
    const buggy = montag`
        (module
            (elem (i32.const 0) $x $y)
        (table 1 2 anyfunc)
            (func $x)
            (func $y)
        )
    `;
    
    const lines = buggy.split('\n');
    const issues = [];
    
    for (const [i, line] of lines.entries()) {
        const position = check(line, lines[i + 1], {
            isFirstLine: !i,
            isLastLine: i === lines.length - 1,
        });
        
        if (position)
            issues.push(i + 1);
    }
    
    t.deepEqual(issues, [3]);
    t.end();
});
