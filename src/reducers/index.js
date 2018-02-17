
import * as actions from '../actions'

const initialState = {
    colors: {
        inner: [ 230 , 100, 50 ],
        outer: [ 130 , 100, 50 ]
    },
    datetime: +new Date(),
    dim: {
        from: 21,
        to: 6,
        level: 30,
        active: false
    },
    timezone: 60
}

export default function reducer (state = initialState, action) {

    switch (action.type) {
        case actions.SET_COLORS:
            return Object.assign({}, state, {
                colors: action.colors
            });

        case actions.SET_TIME:
            return Object.assign({}, state, {
                datetime: +(action.datetime)
            });

        case actions.SET_DIM:
            return Object.assign({}, state, {
                dim: action.dim
            });

        case actions.SET_TIMEZONE:
            return Object.assign({}, state, {
                timezone: action.timezone
            });

        default:
            return state;
    }

}