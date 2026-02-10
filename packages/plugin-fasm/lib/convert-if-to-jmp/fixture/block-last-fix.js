function printf() {
    {
        cmp([line], 24);
        jnz(__nirguna_fasm_if_end_1);
        {
            [
                --line,
            ];
            
            ax = 0x601; // Прокрутка вверх на одну строку
            bh = 0x02; // чорный фон, зеленые символы
            cx ^= cx; // от 00:00
            dx = 0x184f; // 24:79 (весь экран)
            int(0x10);
        }
    }
    __nirguna_fasm_if_end_1: nop();
}
