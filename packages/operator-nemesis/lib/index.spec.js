import {test} from 'supertape';
import {nemesis} from './index.ts';

test('nirguna: operator-nemesis: findFirst', (t) => {
    const result = nemesis.findFirst(0);
    
    t.equal(result, 0);
    t.end();
});

test('nirguna: operator-nemesis: findFile', (t) => {
    const result = nemesis.findFile('kernel');
    
    t.equal(result, 0);
    t.end();
});

test('nirguna: operator-nemesis: readSector', (t) => {
    const result = nemesis.readSector({
        count: 1,
        buffer: 0x7c00,
        sector: 2,
        track: 0,
        head: 0,
    });
    
    t.equal(result, 0);
    t.end();
});

test('nirguna: operator-nemesis: gets', (t) => {
    const result = nemesis.gets({
        size: 10,
        buffer: 0x7c00,
    });
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-nemesis: getChar', (t) => {
    const result = nemesis.getChar();
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-nemesis: printf', (t) => {
    const result = nemesis.printf('hello');
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-nemesis: exec', (t) => {
    const result = nemesis.exec('kernel');
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-nemesis: clearScreen', (t) => {
    const result = nemesis.clearScreen();
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-nemesis: setScreenSize', (t) => {
    const result = nemesis.setScreenSize({
        columns: [80, 25],
        lines: [25, 25],
    });
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-nemesis: setColor', (t) => {
    const result = nemesis.setColor({
        color: 7,
        background: 0,
    });
    
    t.notOk(result);
    t.end();
});
