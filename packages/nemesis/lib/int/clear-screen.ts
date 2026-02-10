import {setLine} from './position/line.ts';
import {setColumn} from './position/column.ts';
import {getColor} from './color.ts';

export async function clearScreen<es, ax, di>() {
    ax = 0xb800;
    es = ax;
    ah = await getColor();
    al = 0;
    di = 0;
    cx = 25 * 80;
    rep.stosw();
    bx = 0;
    
    await setLine();
    await setColumn();
}
