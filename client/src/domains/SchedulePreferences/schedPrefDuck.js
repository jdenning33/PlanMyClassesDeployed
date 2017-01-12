//  CONSTANTS
export const SEMESTER_ENUM = {
  F2016: { key:0, code:'201680', name:'F2016'    },
  S2017: { key:1, code:'201710', name:'S2017'    },
  F2017: { key:2, code:'201680', name:'F2017'    }
}

export const CAMPUS_ENUM = {
  UNM_ABQ:  { key:0,  name:'ABQ'        ,   code:'ABQ'  },
  UNM_EA:   { key:1,  name:'Online'     ,   code:'EA'   },
  UNM_EF:   { key:3,  name:'San Juan'   ,   code:'EF'   },
  UNM_EG:   { key:4,  name:'Gallup Grad',   code:'EG'   },
  UNM_EW:   { key:5,  name:'Westside'   ,   code:'EW'   },
  UNM_GA:   { key:6,  name:'Gallup'     ,   code:'GA'   },
  UNM_LA:   { key:7,  name:'Los Alamos' ,   code:'LA'   },
  UNM_TA:   { key:8,  name:'Taos'       ,   code:'TA'   },
  UNM_TAM:  { key:9,  name:'Taos/Mora'  ,   code:'TAM'  },
  UNM_TAQ:  { key:10, name:'Taos/Questa',   code:'TAQ'  },
  UNM_VA:   { key:11, name:'Valencia'   ,   code:'VA'   }
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
