// All external data is loaded here, anything that loads should have a reducer
// case to handle new data being fetched, and new data being received

// Anything trying to display something from dataCache, should check if the cached
// value exists, if so, display it. If the cached data doesn't exist, check the
// fetching array, if it's in the fetching array, display a spinner. If it's not
// in the fetching array, then request the data from the db and then display a
// spinner.

import dataAPI from '../apis/dataAPI'

//  CONSTANTS
const dataURL = 'https://planmyclasses2.herokuapp.com/api';
export const COLLECTIONS_ENUM = {
  SUBJECTS:     { key:1, url:`${dataURL}/subjects`    , name:'subjects'    },
  COURSES:      { key:2, url:`${dataURL}/courses`     , name:'courses'     },
  SECTIONS:     { key:3, url:`${dataURL}/sections`    , name:'sections'    },
  INSTRUCTORS:  { key:4, url:`${dataURL}/instructors` , name:'instructors' }
};

export const initialState = {
  //Array of ObjectId's that are being fetched
  fetchingIDs : [],
  //Data cached in state from the db
  data: { subjects    : {},
          sections    : {},
          courses     : {},
          instructors : {}
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

const waitForDataToLoad = (request, getState) => new Promise(
  (resolve, reject) => {

  let dataState = getState().dataCacheReducer;

  let finished = true;
  request.dataIDs.forEach(dataID => {
    if( finished && dataState.fetchingIDs.some( (id) => id===dataID )){
      finished = false;
      setTimeout(() =>
        waitForDataToLoad(request, getState)
        .then( () => resolve() )
        , 200);
    }
  });


  if(finished){
    resolve();
  }
});

const isDataCached = (request, dataState) => {
  let needToFetch = [];

  request.dataIDs.forEach(dataID => {
    if(!dataID) return;
    if( !(dataState.data[request.type.name][dataID]) &&
        !(dataState.fetchingIDs.some( (id) => id===dataID) )){
      needToFetch.push(dataID);
    }
  });

  return needToFetch;
};

const fetchData = (request, dataIDs)  => new Promise(
  (resolve, reject) => {

  let promises = [];
  let allData = [];

  if(dataIDs){
    dataIDs.forEach(dataID =>
      promises.push(dataAPI.get(
      { type    : request.type,
        dataID : dataID
      })
      .then((data) => allData.push(data))
      .catch(err => console.log(err) ))
    );
  }else{
    promises.push(dataAPI.get(
    { type: request.type,
    })
    .then((data) => {
      allData = allData.concat(data);
    })
    .catch(err => console.log(err) ));
  }

  Promise.all(promises)
  .then(()=>resolve(allData))
  .catch((err) => console.error(err));
});


export const dataCache = {
  // request should have a type of data to retrieve
  // an originator for the request, must be in the ORIGINATORS_ENUM
  // and an id or array of ids of the data we are requesting
  fetchIfNeeded: (request) => (dispatch, getState) => new Promise(
    (resolve, reject) => {

    let dataState = getState().dataCacheReducer;
    let dataToFetch;
    if(request.dataIDs) dataToFetch = isDataCached(request, dataState);

    if(!dataToFetch){
      // dispatch( requestData(request) );
      //fetch the data
      fetchData(request, dataToFetch)
      .then( (data) => {

        //tell the ui that we've fetched the data
        dispatch(receiveData(request, data));
        resolve(data);
      })
      .catch(err => reject(err))
    }
    else if(dataToFetch.length){
      //tell the ui we are fetching data
      dispatch( requestData(request) );
      //fetch the data
      fetchData(request, dataToFetch)
      .then( (data) => {

        //tell the ui that we've fetched the data
        dispatch(receiveData(request, data));
        resolve(data);
      })
      .catch(err => reject(err))
    }else{

      waitForDataToLoad(request, getState)
      .then( () => {
        let data = [];
        dataState = getState().dataCacheReducer;

        request.dataIDs.forEach(dataID => {
          data.push(dataState.data[request.type.name][dataID]);
        });
        resolve(data);
      })
      .catch((err) => console.error(err) );
    };
  }),

  isDataLoaded: (data, dataIDs) => {
    //no data to load
    if( !dataIDs ) return false;

    //all data is loaded
    if( !dataIDs.every(dataID => {
      return data[dataID]
    }) ) return false;

    //all data must be loaded
    return true;
  },

  areCoursesAndSectionsLoaded: (sections, courses, courseIDs) => {
    //we haven't even loaded the courses yet
    if( !dataCache.isDataLoaded(courses, courseIDs) ) return false;
    //calculate the sectionIDs we need loaded
    let sectionIDs = [];
    courseIDs.forEach(courseID => {
      sectionIDs = sectionIDs.concat(courses[courseID].sectionIDs)
    });
    //we haven't loaded the sections yet
    if( !dataCache.isDataLoaded(sections, sectionIDs) ) return false;
    //we must have loaded everything

    return true;
  },

  deepLoadCourses: (courseIDs, getData) => {
    getData(courseIDs, COLLECTIONS_ENUM.COURSES)
    .then( (data) => {
      let courses = data;
      let sectionIDs = [];
      courses.forEach(course => {
        sectionIDs = sectionIDs.concat(course.sectionIDs)
      });
      getData(sectionIDs, COLLECTIONS_ENUM.SECTIONS);
    })
    .catch(err=> console.error(err));
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

      action.data.forEach( (data) => {
        newData[collection][data._id] = data;
      });

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
