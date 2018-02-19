
export const SET_NETWORK = 'SET_NETWORK';
export const SET_TIME = 'SET_TIME';
export const SET_COLORS = 'SET_COLORS';
export const SET_DIM = 'SET_DIM';
export const SET_TIMEZONE = 'SET_TIMEZONE';
export const SET_UTCOFFSET = 'SET_UTCOFFSET';

export function setNetwork (network) {
    return {
        type: SET_NETWORK,
        network
    }
}

export function setTime (datetime) {
    return {
        type: SET_TIME,
        datetime
    };
}

export function setColors (colors) {
    return {
        type: SET_COLORS,
        colors
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