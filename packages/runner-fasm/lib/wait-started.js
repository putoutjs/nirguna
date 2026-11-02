import {setTimeout} from 'node:timers/promises';
import {tryToCatch} from 'try-to-catch';

const race = (...promises) => Promise.race(promises);

const expire = async (deadline, signal) => {
    const delay = Math.max(deadline - Date.now(), 0);
    
    await setTimeout(delay, null, {
        signal,
    });
    
    throw Error('emulator did not start');
};

export const waitStarted = async ({emulator, deadline}) => {
    const controller = new AbortController();
    const started = new Promise((resolve) => {
        emulator.bus.register('emulator-started', resolve);
    });
    
    const [error] = await tryToCatch(race, started, expire(deadline, controller.signal));
    
    controller.abort();
    
    if (error)
        throw error;
};
