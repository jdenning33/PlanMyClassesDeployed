//  CONSTANTS
const initialState = {
  desiredIDs: { }
}

//  ACTIONS
const ADD_COURSE_ID = 'desiredCourse/ADD_COURSE'
const TOGGLE_DESIRED = 'desiredCourse/TOGGLE_DESIRED'

//  ACTION CREATORS
export const addCourseID = (filter) => {
  return {
    type: ADD_COURSE_ID,
    filter
  }
}

export const desiredCourses = {
  toggleDesired: (dataID, collection) => {
    return{
      type: TOGGLE_DESIRED,
      dataID: dataID,
      collection: collection
    }
  }
}

//  REDUCERS
const desiredCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE_ID:
      return Object.assign({},state,{
        desiredCourses: Object.assign({}, state.desiredCourses, action.filter)
      });

    case TOGGLE_DESIRED:
      let newDesired = Object.assign({}, state.desiredIDs);
      if(!state.desiredIDs[action.dataID]){
        newDesired[action.dataID] = {type:action.collection.name};
      }else{
        delete newDesired[action.dataID];
      }
      return Object.assign({},state,{
        desiredIDs: newDesired
      });

    default:
      return state
  }
}

export default desiredCoursesReducer
