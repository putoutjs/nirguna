import {nemesis} from '@nirguna/operator-nemesis';

let commandNotFoundFirst = [`Command: '`];

let commandNotFoundSecond = [
    `' not found. Type 'help' to get list of supported commands.`,
    0xd,
];

export async function notFound(command) {
    nemesis.printf(commandNotFoundFirst);
    nemesis.printf(command);
    nemesis.printf(commandNotFoundSecond);
}
