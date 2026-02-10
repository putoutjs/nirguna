import {nemesis} from '@nirguna/operator-nemesis';
import {i16} from '@nirguna/operator-fasm';
import {printf} from '../printf';

let UNKNOWN_CODE = 'Error: unknown interrupt code: ';
let intCode: i16 = 0;

zero.db = 0;

export async function printfUnknownCode(code) {
    ax = code;
    //ax += 30;
    [intCode] = ax;
    bx = UNKNOWN_CODE;
    await printf();
}
