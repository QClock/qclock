
export const SET_NETWORK = 'SET_NETWORK';
export const SET_TIME = 'SET_TIME';
export const SET_COLOR = 'SET_COLOR';
export const SET_DIM = 'SET_DIM';
export const SET_TIMEZONE = 'SET_TIMEZONE';
export const SET_UTCOFFSET = 'SET_UTCOFFSET';
export const SET_ADVANCED = 'SET_ADVANCED';
export const SET_PIXELS = 'SET_PIXELS';

export function setNetwork (network) {
    return {
        type: SET_NETWORK,
        network
    }
}

export function setTime (datetime) {
    return {
        type: SET_TIME,
        datetime: +new Date(datetime)
    };
}

export function setColor (color) {
    return {
        type: SET_COLOR,
        color
    };
}

export function setDim (dim) {
    return {
        type: SET_DIM,
        dim
    };
}

export function setTimeZone (timezone) {
    return {
        type: SET_TIMEZONE,
        timezone
    };
}

export function setUtcOffset (utcOffset) {
    return {
        type: SET_UTCOFFSET,
        utcOffset
    }
}

export function setAdvanced (advanced) {
    return {
        type: SET_ADVANCED,
        advanced
    }
}

export function setPixels (pixels) {
    return {
        type: SET_PIXELS,
        pixels
    }
}