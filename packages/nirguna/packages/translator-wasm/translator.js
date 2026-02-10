import createWabt from 'wabt';
import {tryCatch} from 'try-catch';

export const translate = async (wast, options = {}) => {
    const {name = 'nirguna.wast', type} = options;
    
    const {parseWat} = await createWabt();
    const [error, parsedWat] = tryCatch(parseWat, name, wast);
    
    if (error)
        return [null, toPlaces(name, error)];
    
    const {log, buffer} = parsedWat.toBinary({
        log: type === 'dump',
    });
    
    return [
        log || buffer,
        [],
    ];
};

function toPlaces(name, error) {
    const [, first] = error.message.split('\n');
    
    const list = first
        .replace(`${name}�`, '')
        .split(':');
    
    list.shift();
    
    const [line, column] = list;
    
    list.shift();
    list.shift();
    list.shift();
    
    const messageRaw = list
        .join(':')
        .slice(1);
    
    const message = messageRaw[0].toUpperCase() + messageRaw.slice(1);
    
    return [{
        message,
        position: {
            line: Number(line),
            column: Number(column),
        },
    }];
}
