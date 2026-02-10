{
    pusha();
    {
        cl = 4;
        ch = 0;
        al = 6;
        int(0xff);
    }
    {
        al = 2;
        bx = hello;
        int(0xff);
    }
    {
        cl = 2;
        ch = 0;
        al = 6;
        int(0xff);
    }
    popa();
}
debug('world');
