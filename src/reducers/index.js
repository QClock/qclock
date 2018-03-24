
import * as actions from '../actions'
import log from '../log'
import initialState from '../state'

export default function reducer (state = initialState, action) {

    log.info('ACTION', action)

    switch (action.type) {
        case actions.SET_NETWORK:
            return Object.assign({}, state, {
                network: action.network
            });

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

        case actions.SET_UTCOFFSET:
            return Object.assign({}, state, {
                utcOffset: action.utcOffset
            });

        case actions.SET_ADVANCED:
            return Object.assign({}, state, {
                advanced: action.advanced
            });

        default:
            return state;
    }

}