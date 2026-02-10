import {
    Decoder,
    DecoderOptions,
    Formatter,
    FormatterSyntax,
} from 'iced-x86';

function parseBitness(source) {
    if (source.startsWith('use32'))
        return 32;
    
    return 16;
}

export const dump = (source, binary) => {
    const exampleRip = 0x0000000000007c00n;
    const hexBytesColumnByteLength = 10;
    const bitness = parseBitness(source);
    
    const decoder = new Decoder(bitness, binary, DecoderOptions.None);
    
    decoder.ip = exampleRip;
    // This decodes all bytes. There's also `decode()` which decodes the next instruction,
    // `decodeInstructions(count)` which decodes `count` instructions and `decodeOut(instruction)`
    // which overwrites an existing instruction.
    const instructions = decoder.decodeAll();
    
    // Create a nasm formatter. It supports: Masm, Nasm, Gas (AT&T) and Intel (XED).
    // There's also `FastFormatter` which uses less code (smaller wasm files).
    //     const formatter = new FastFormatter();
    const formatter = new Formatter(FormatterSyntax.Intel);
    
    // Change some options, there are many more
    formatter.digitSeparator = '`';
    formatter.firstOperandCharIndex = 10;
    // Format the instructions
    
    const output = instructions.map((instruction) => {
        // Eg. "00007FFAC46ACDB2 488DAC2400FFFFFF     lea       rbp,[rsp-100h]"
        let line = instruction.ip.toString(16);
        
        line += ' ';
        const startIndex = Number(instruction.ip - exampleRip);
        
        for (const b of binary.slice(startIndex, startIndex + instruction.length)) {
            line += ('0' + b.toString(16))
                .substr(-2)
                .toUpperCase();
        }
        
        for (let i = instruction.length; i < hexBytesColumnByteLength; i++)
            line += '  ';
        
        line += ' ';
        line += formatter.format(instruction);
        
        return line;
    });
    
    // Free wasm memory
    for (const instruction of instructions)
        instruction.free();
    
    formatter.free();
    decoder.free();
    
    return output.join('\n');
};
