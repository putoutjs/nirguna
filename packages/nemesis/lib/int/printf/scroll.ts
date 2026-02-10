import {getColor} from '../color';

export async function scroll() {
    pusha();
    
    ax = 0xb800;
    ds = ax;
    es = ax;
    si = 80 * 2;
    di = 0;
    cx = 80 * 24 * 2;
    rep.movsb();
    
    ax = 0;
    ds = ax;
    ah = al;
    al = await getColor();
    xchg(al, ah);
    cx = 80;
    rep.stosw();
    
    popa();
}
