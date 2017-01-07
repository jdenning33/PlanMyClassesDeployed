// import dataAPI, { COLLECTIONS_ENUM } from '../apis/dataAPI';

// All external data is loaded here, anything that loads should have a reducer
// case to handle new data being fetched, and new data being received

// Anything trying to display something from dataCache, should check if the cached
// value exists, if so, display it. If the cached data doesn't exist, check the
// fetching array, if it's in the fetching array, display a spinner. If it's not
// in the fetching array, then request the data from the db and then display a
// spinner.

import dataAPI from '../apis/dataAPI'

//  CONSTANTS
const dataURL = 'http://localhost:3001/api';
export const COLLECTIONS_ENUM = {
  SCHEDULES:     { key:101, url:`${dataURL}/schedules`    , name:'schedules'    },
  SCHEDULE:      { key:102, url:`${dataURL}/schedule`    , name:'schedule'    },
};

export const initialState = {
  //Array of ObjectId's that are being fetched
  userID : null ,
  //Data cached in state from the db
  data: { courseLoads   : {},
          schedules    : {},
        }
}



//  ACTIONS
const dataCacheActions = {
  FETCH_DATA_REQUEST  :   'dataCache/FETCH_DATA_REQUEST',
  FETCH_DATA_SUCCESS  :   'dataCaceh/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAILURE  :   'dataCache/FETCH_DATA_FAILURE',
}

//  ACTION CREATORS

// This will add the ids to state fetching array
// and the originator will also be able to set up spinners
const requestData = (request, dataIDs) => (
  {
    type        : dataCacheActions.FETCH_DATA_REQUEST,
    request     : request
  }
);
// This will remove the ids from the state fetching array
// the originator will rebuild
const receiveData = (request, data) => (
  {
    type        : dataCacheActions.FETCH_DATA_SUCCESS,
    request     : request,
    data        : data
  }
);

const isDataCached = (request, dataState) => {
  let needToFetch = [];

  request.dataIDs.forEach(dataID => {
    if( !(dataState.data[request.type.name][dataID]) &&
        !(dataState.fetchingIDs.some( (id) => id===dataID) )){
      needToFetch.push(dataID);
    };
  });
  return needToFetch;
};

const fetchData = (request, dataIDs) => (dispatch) => {
  dispatch( requestData(request) );

  let promises = [];
  dataIDs.forEach(dataID =>
      promises.push(dataAPI.get(
      { type    : request.type,
        dataID : dataID
      })
      .then(data => {
        dispatch(receiveData(request, data))
      })
      .catch(err => console.log(err) ))
    )

  return (
    Promise.all(promises)
  );
};


export const dataCache = {
  // request should have a type of data to retrieve
  // an originator for the request, must be in the ORIGINATORS_ENUM
  // and an id or array of ids of the data we are requesting
  fetchIfNeeded: (request) => (dispatch, getState) => {
    let dataState = getState().dataCacheReducer;
    let dataToFetch = isDataCached(request, dataState);
    if(!dataToFetch.length) dispatch(receiveData(request))
    else dispatch( fetchData(request, dataToFetch) );
  }
};

const dataCacheReducer = (state = initialState, action) => {
  switch (action.type){

    case dataCacheActions.FETCH_DATA_REQUEST:
      let newFetchingIDs = [];
      state.fetchingIDs.forEach((id)=>newFetchingIDs.push(id));
      action.request.dataIDs.forEach((id)=>newFetchingIDs.push(id));

      return Object.assign({}, state, {
        fetchingIDs: newFetchingIDs
      });

    case dataCacheActions.FETCH_DATA_SUCCESS:
      let collection = action.request.type.name;
      let newData = Object.assign({},state.data);

      newData[collection][action.data._id] = action.data ;
      return Object.assign({}, state, {
        fetchingIDs: state.fetchingIDs.filter( (id) => (
          !(action.request.dataIDs).some( (id2) => id2===id )
        )),
        data: newData
      });
    default:
      return state;
  }
}

export default dataCacheReducer;
