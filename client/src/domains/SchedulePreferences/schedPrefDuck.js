//  CONSTANTS
export const SEMESTER_ENUM = {
  F2016: { key:0, name:'Fall-2016'    },
  S2017: { key:1, name:'Spring-2017'  },
  F2017: { key:2, name:'Fall-2017'    }
}

export const CAMPUS_ENUM = {
  UNM_ABQ:    { key:0,  name:'ABQ Main',  code:'ABQ'    },
  UNM_NORTH:  { key:1,  name:'ABQ North', code:'NORTH'  },
  UNM_WEST:   { key:2,  name:'ABQ West',  code:'WEST'   }
}

export const DESIRE_ENUM = {
  ENCOURAGED:   { key:0, name:'Encouraged'  },
  INDIFFERENT:  { key:1, name:'Indifferent' },
  DISCOURAGED:  { key:2, name:'Discouraged' },
  NEVER:        { key:3, name:'Never'       }
}

const initialState = {
  semester:       SEMESTER_ENUM.F2016 ,
  campus:         [ CAMPUS_ENUM.UNM_ABQ ] ,
  online_desire:  DESIRE_ENUM.INDIFFERENT
}

//  ACTIONS
const SET_SEMESTER      = 'schedPref/SET_SEMESTER';
const SET_CAMPUS        = 'schedPref/SET_CAMPUS';
const SET_ONLINE_DESIRE = 'schedPref/SET_ONLINE_DESIRE';

//  ACTION CREATORS
export const setSemester = (filter) => {
  return {
    type: SET_SEMESTER,
    filter
  }
}

export const setCampus = (filter) => {
  return {
    type: SET_CAMPUS,
    filter
  }
}

export const setOnlineDesire = (filter) => {
  return {
    type: SET_ONLINE_DESIRE,
    filter
  }
}


//  REDUCERS
const toggle = (preferences, preference) => {
  let newPrefs = preferences.filter( (pref) => pref !== preference )
  if(newPrefs.length !== preferences.length) return newPrefs
  return [...preferences, preference]
}

const schedPrefReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEMESTER:
      return Object.assign({},state,{
        semester: action.filter
      })
    case SET_CAMPUS:
      return Object.assign({}, state, {
        campus: toggle(state.campus, action.filter)
      })
    case SET_ONLINE_DESIRE:
      return Object.assign({}, state, {
        online_desire: action.filter
      })
    default:
      return state
  }
}

export default schedPrefReducer
