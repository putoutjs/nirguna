import {
    io,
    rb,
    i16,
} from '@nirguna/operator-fasm';

let status_buffer: rb = 7;
let sec_quantity = 0;
let secbuffer: i16 = 0;
let sec_number = 0;
let track_number = 0;
let drive = 0;
let head = 0;
let secread_com = 0xE6;

const BUSY = 0x80;
const SEEK = 0xf;
const FULL_LENGTH = 0xFF;
const GAP = 0x1B;
const END_OF_TRACK = 0x12;
const LENGTH_512 = 2;

let dma_command = 0x46;

const RESET_CONTROLLER = 4;
const USE_DMA = 8;
const RUN_MOTOR = 16;

const STATUS_REGISTER = 0x3f4;
const DATA_REGISTER = 0x3f5;
const MOTOR_REGISTER = 0x3f2;
const FLOPPY = 0;

// ah - кол-во секторов
// bx - buffer
// cl - номер сектора
// ch - номер дорожки
// dl - номер накопителя(0 для дискеты первой)
// dh - головка
export async function readSector() {
    [sec_quantity] = ah;
    [secbuffer] = bx;
    [sec_number] = cl;
    [track_number] = ch;
    [drive] = dl;
    [head] = dh;
    
    if (cl > 0x12)
        return 1;
    
    if (dh > 1)
        return 2;
    
    debug('enter');
    
    do {
        dec([sec_quantity]);
        sti();
        dx = MOTOR_REGISTER;
        al = RESET_CONTROLLER + USE_DMA + RUN_MOTOR;
        io.out(dx, al);
        await waitLong();
        ah = SEEK; // номер кода
        await outFDC();
        // посылаем контроллеру НГМД
        ah = FLOPPY; // номер накопителя (дискета ;))
        await outFDC();
        
        ah = [track_number];
        await outFDC();
        
        debug('before wait long 2');
        await waitInterrupt(); // ожидаем прерывания от НГМД
        debug('after wait long 2');
        await waitShort();
        debug('after wait short');
        
        al = [dma_command];
        //0x4a;для записи 0x46
        // код чтения данных контроллера нмгд
        io.out(12, al); // посылаем код по 2-ум адресам
        io.out(11, al); // вычисляем адрес буфера
        ax = [secbuffer]; // смещение буфера в ds
        bx = ds;
        cl = 4; // готовим вращения старшего нибла
        rol(bx, cl); //вращаем младшие 4 бита
        dl = bl;
        dl &= 0xf; // чистим старший нибл в dl
        bl &= 0xf0; // чистим младший нибл в bl
        ax += bx;
        jnc(no_carry);
        // если не было переноса,
        // то страницы в dl
        ++dl; // увеличиваем dl, если был перенос
        no_carry: io.out(4, al);
        // посылаем младший байт адреса
        al = ah; // сдвигаем старший байт
        io.out(4, al); //посылаем младший байт адреса
        al = dl; //засылаем номер страницы
        io.out(0x81, al);
        //посылаем номер страницы
        // конец инициализации
        ax = 0x200 - 1; //значение счетчика
        io.out(5, al); //посылаем младший байт
        al = ah; // готовим старший байт
        io.out(5, al); //посылаем старший байт
        al = 2; //готовим разрешение канала 2
        io.out(10, al); //DMA ожидает данные
        ah = [secread_com]; // 0xE6;0x66;код чтения одного сектора
        debug('before wait');
        await outFDC();
        //посылаем команду контроллеру нмгд
        ah = [head];
        // head/drive по формуле
        // 00000hdd, поэтому если головка 1
        // ;то в ah будет 4=2^2
        ah <<= 2;
        await outFDC();
        
        ah = [track_number];
        await outFDC();
        
        ah = [head];
        await outFDC();
        
        ah = [sec_number];
        await outFDC();
        
        ah = LENGTH_512; // 0x200 [es:bx+3];код размера сектора
        await outFDC();
        
        ah = END_OF_TRACK;
        await outFDC();
        
        ah = GAP;
        await outFDC();
        
        ah = FULL_LENGTH;
        await outFDC();
        
        debug('before interrupt');
        await waitInterrupt();
        debug('after interrupt');
        // читаем результирующие байты
        cx = 7; // берем 7 байтов статуса
        bx = status_buffer;
        debug('before loop');
        do {
            await inFDC(); // получаем байт
            [bx] = al; // помещаем в буфер
            ++bx;
            // указываем на следующий байт буфера
        } while (--cx);
        // выключаем мотор
        dx = MOTOR_REGISTER;
        al = RESET_CONTROLLER + USE_DMA; // оставляем биты 3 и 4 (12)
        io.out(dx, al); // посылаем новую установку
        [secbuffer] += 0x200;
        inc([sec_number]);
        
        if ([sec_number] > END_OF_TRACK) {
            inc([track_number]);
            [sec_number] = 1;
        }
        
        al = [sec_quantity];
    } while (al);
    debug('end');
}

// ждем прерывание нгмд; управление статусом
async function waitInterrupt<es>() {
    // прерывания 6 в байте статуса BIOS
    // прерывания 6 в байте статуса BIOS
    ax = 0x40; // Сегмент области данных BIOS
    es = ax; // помещаем в es
    bx = 0x3e; //смещение для байта статуса
    do {
        dl = es[bx];
    } while (!test(dl, BUSY));
    // проверяем бит 7
    dl &= 0b1_111_111; //сбрасываем бит 7
    es[bx] = dl; //заменяем байт статуса
}

// шлем байт из ah fdc
async function outFDC() {
    await waitWhileBusy();
    
    dx = DATA_REGISTER;
    al = ah;
    io.out(dx, al);
}

async function inFDC() {
    await waitWhileBusy();
    dx = DATA_REGISTER;
    io.in(al, dx);
}

async function waitWhileBusy() {
    dx = STATUS_REGISTER;
    do {
        io.in(al, dx);
    } while (!test(al, BUSY));
}

async function waitLong() {
    cx = 3500;
    loop($);
}

async function waitShort() {
    cx = 1750;
    loop($);
}
