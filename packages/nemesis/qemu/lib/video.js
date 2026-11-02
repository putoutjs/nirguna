const COLUMNS = 80;
const ROW = /^0+b8[\da-f]{3}: (.+)$/gm;
const BYTE = /0x([\da-f]{2})/g;

const isCharIndex = (byte, index) => !(index % 2);

export const toVideo = (output) => {
    const bytes = [];
    
    for (const [, row] of output.matchAll(ROW))
        for (const [, byte] of row.matchAll(BYTE))
            bytes.push(parseInt(byte, 16));
    
    return Uint8Array.from(bytes);
};

export const toText = (video) => {
    const chars = video.filter(isCharIndex);
    const lines = [];
    
    for (let i = 0; i < chars.length; i += COLUMNS)
        lines.push(
            String
                .fromCharCode(...chars.slice(i, i + COLUMNS))
                .trimEnd(),
        );
    
    return lines.join('\n');
};
