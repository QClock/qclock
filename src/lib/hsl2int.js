import hsl2rgb from './hsl2rgb'
import log from '../log'

export default function hsl2int (h, s, l) {
    const [ r, g, b ] = hsl2rgb(h,s,l)
    log.info('r g b', [ r, g, b ])
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}