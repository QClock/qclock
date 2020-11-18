import hsl2rgb from './hsl2rgb'

export default function hsl2int (h, s, l) {
    const [ r, g, b ] = hsl2rgb(h,s,l)
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}