import {test} from 'supertape';
import {tryToCatch} from 'try-to-catch';
import {waitStarted} from './wait-started.js';

const DELAY = 20;

const getEmulator = (register) => ({
    bus: {
        register,
    },
});

test('nirguna: runner-fasm: waitStarted: event', async (t) => {
    const names = [];
    const register = (name) => {
        names.push(name);
    };
    
    const emulator = getEmulator(register);
    
    await tryToCatch(waitStarted, {
        emulator,
        deadline: Date.now() + DELAY,
    });
    const result = names;
    const expected = ['emulator-started'];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: runner-fasm: waitStarted: started', async (t) => {
    const register = (name, fn) => fn();
    const emulator = getEmulator(register);
    
    const [error] = await tryToCatch(waitStarted, {
        emulator,
        deadline: Date.now() + 10_000,
    });
    
    t.notOk(error);
    t.end();
});

test('nirguna: runner-fasm: waitStarted: not started', async (t) => {
    const register = () => {};
    const emulator = getEmulator(register);
    
    const [error] = await tryToCatch(waitStarted, {
        emulator,
        deadline: Date.now() + DELAY,
    });
    
    const result = error.message;
    const expected = 'emulator did not start';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: runner-fasm: waitStarted: deadline in the past', async (t) => {
    const register = () => {};
    const emulator = getEmulator(register);
    
    const [error] = await tryToCatch(waitStarted, {
        emulator,
        deadline: Date.now() - 1000,
    });
    
    const result = error.message;
    const expected = 'emulator did not start';
    
    t.equal(result, expected);
    t.end();
});
