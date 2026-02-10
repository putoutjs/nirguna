let minline: i8 = 0;
let maxline: i8 = 24;
let maxcol: i8 = 79;
let textcolor: i8 = 2;

let bgcolor: i8 = 0;
let file_offset: i16 = 0;
let file_size: i16 = 0;
let file_sec_size: i8 = 0;
let error_reading: string = 'error reading the file o_O';
const error_reading2 = 'error reading the file o_O';
let exec_addr: i16 = 0x500;
let old_ds: i16 = 0;
let old_esi: i16 = 0;

const hi = ['Hello from Nemesis =)!', 0xd]
let buf: rb = 0x10;

export const compare = (eax) => {
    if (!eax)
        return 1;
    
    return 0;
}

const x = () => {};