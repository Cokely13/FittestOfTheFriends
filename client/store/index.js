import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import userReducer from './allUsersStore'
import eventsReducer from './allEventsStore'
import resultsReducer from './allResultsStore'

const reducer = combineReducers({
  auth,
  allUsers: userReducer,
  allEvents: eventsReducer,
  allResults: resultsReducer
 })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
