const hasName = (name, shape) => shape.name === name;

export const SHAPES = [{
    name: 'string-length',
    templates: [
        'function __a(__args) {let __n = 0; while (__p[__n]) __n++; return __n;}',
        'function __a(__args) {let __n = 0; while (__p[__n]) {__n++;} return __n;}',
    ],
    parameters: ['__p'],
    values: [
        ['__p', 'si'],
        ['__n', 'cx'],
    ],
    returnType: 'ureg',
    body: `{
        let usi = __p;
        let ucx = 0;
        cld();
        while (lodsb()) {
            ++ucx;
        }
        return ucx;
    }`,
}, {
    name: 'clear-buffer',
    templates: [
        'function __a(__args) {let __n = 0; while (__p[__n]) {__p[__n] = 0; __n++;}}',
    ],
    parameters: ['__p'],
    values: [
        ['__p', 'di,si'],
        ['__n', '-'],
    ],
    returnType: '',
    body: `{
        di = __p;
        si = __p;
        while (lodsb()) {
            al = 0;
            stosb();
        }
    }`,
}, {
    name: 'strcmp',
    templates: [
        'function __a(__args) {let __n = 0; while (__p[__n]) {if (__p[__n] !== __q[__n]) return 1; __n++;} return 0;}',
    ],
    parameters: ['__p', '__q'],
    values: [
        ['__p', 'si'],
        ['__q', 'di'],
        ['__n', '-'],
    ],
    returnType: 'ureg',
    body: `{
        let uax = 0;
        let usi = __p;
        let udi = __q;
        cld();
        while (lodsb()) {
            if (al !== [udi]) {
                al = 1;
                break;
            }
            ++udi;
        }
        return uax;
    }`,
}, {
    name: 'hex-to-dec',
    templates: [
        'function __a(__args) {if (__p >= 0x30 && __p <= 0x40) return __p - 0x30; if (__p <= 0x61 || __p >= 0x66) return 0x10; return __p;}',
    ],
    parameters: ['__p'],
    values: [
        ['__p', 'al'],
    ],
    registerParameters: true,
    returnType: 'i8',
    body: `{
        if (al >= 0x30 && al <= 0x40)
            return al - 0x30;
        
        if (al <= 0x61 || al >= 0x66)
            return 0x10;
        
        return al;
    }`,
}];

export const findShape = (name) => SHAPES.find(hasName.bind(null, name));
