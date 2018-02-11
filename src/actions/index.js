

export const SET_TIME = 'SET_TIME';

export const SET_COLORS = 'SET_COLORS';

export const SET_DIM = 'SET_DIM';

export const SET_TIMEZONE = 'SET_TIMEZONE';

export function setTime (datetime) {
    return {
        type: SET_TIME,
        datetime: datetime
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