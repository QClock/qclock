import log from './log'

import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers)

log.info('store created');

export default store