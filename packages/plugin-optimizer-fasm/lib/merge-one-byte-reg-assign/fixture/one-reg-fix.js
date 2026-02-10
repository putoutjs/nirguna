mov(ah, 0xff);
call(out_fdc);
call(waitInterrupt);
