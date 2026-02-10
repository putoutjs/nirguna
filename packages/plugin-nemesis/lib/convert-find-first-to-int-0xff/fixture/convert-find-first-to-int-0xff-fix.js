import {nemesis} from '#operator-fasm';

{
    al = 5;
    bx = a;
    int(0xff);
}
{
    al = 5;
    bx = bx;
    int(0xff);
    ax = ax;
}
{
    al = 5;
    int(0xff);
}
