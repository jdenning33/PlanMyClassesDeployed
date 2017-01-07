//  ACTIONS

//  ACTION CREATORS

//  REDUCERS
import { combineReducers } from 'redux'
import schedPrefReducer from './domains/SchedulePreferences/schedPrefDuck'
import scheduleBuilderReducer from './routes/ScheduleBuilder/scheduleBuilderDuck'
import courseBrowserReducer from './routes/CourseBrowser/courseBrowserDuck'
import dataCacheReducer from './dataHandling/dataCache'

const reducer = combineReducers({
  schedPrefReducer,
  scheduleBuilderReducer,
  courseBrowserReducer,
  dataCacheReducer
})

export default reducer
