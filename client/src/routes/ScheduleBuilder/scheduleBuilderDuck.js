//  CONSTANTS
const initialState = {
  // boolean/id if id is set, our desired courses will display an add to
  // button so we can set up class or's
  setRelationship: false,
  isHelpActive: false,
  isPreferencesActive: false,
  isDesiredActive: false,

  // Use this to set up relationships, then push to desiredMap
  newRelationship: [],
  //realtionships contains the ids of all the courses.
  // each id is in an array. If there is an or relationship between two
  //  courses, then they are in the same array
  desiredMap:
  {   relationships:  [ [  '586477d6c5d24f47c82d219b',
                           '586477cec5d24f47c82d2104'
                        ],
                        [  '586477cfc5d24f47c82d210d'
                        ]
                      ],

//active courses contains an array of each currently selected course
// this means one item from each of the relationship arrays
      activeCourseIDs: [ '586477d6c5d24f47c82d219b',
                         '586477cfc5d24f47c82d210d',
                     ],

      data:          {  '586477d6c5d24f47c82d219b':   //course
                            { activeSectionID:  '58647835c5d24f47c82d29c7',
                              removedSections: [],
                            },

                        '586477cec5d24f47c82d2104':
                            { activeSectionID:  '586477e6c5d24f47c82d2293',
                              removedSections: [],
                            },

                        '586477cfc5d24f47c82d210d':
                            { activeSectionID:  '586477eec5d24f47c82d23c1',
                              removedSections: [],
                            },
                    }
  },

  // Any cards that have been clicked and should be showing more info
  expandedIDs: [],
}

//  ACTIONS
const TOGGLE_DESIRED_COURSE   = 'scheduleBuilder/TOGGLE_DESIRED_COURSE'
const TOGGLE_DESIRED_SECTION  = 'scheduleBuilder/TOGGLE_DESIRED_SECTION'
const SWITCH_ACTIVE_COURSE    = 'scheduleBuilder/SWITCH_ACTIVE_COURSE'
const SWITCH_ACTIVE_SECTION   = 'scheduleBuilder/SWITCH_ACTIVE_SECTION'
const CARD_CLICKED            = 'scheduleBuilder/CARD_CLICKED'
const OPEN_HELP               = 'scheduleBuilder/OPEN_HELP';
const CLOSE_HELP              = 'scheduleBuilder/CLOSE_HELP';
const TOGGLE_PREFERENCES      = 'scheduleBuilder/TOGGLE_PREFERENCES'
const TOGGLE_DESIRED          = 'scheduleBuilder/TOGGLE_DESIRED'
const TOGGLE_SET_RELATIONSHIP = 'scheduleBuilder/TOGGLE_SET_RELATIONSHIP'
const STAGE_NEW_RELATIONSHIP  = 'scheduleBuilder/STAGE_NEW_RELATIONSHIP'
const BREAK_FROM_RELATIONSHIP = 'scheduleBuilder/BREAK_FROM_RELATIONSHIP'


//  ACTION CREATORS
export const scheduleBuilder = {
  toggleDesiredCourse: (course) => {
    return{
      type: TOGGLE_DESIRED_COURSE,
      course: course,
    }
  },
  toggleDesiredSection: (section) => {
    return{
      type: TOGGLE_DESIRED_SECTION,
      section: section,
    }
  },

  switchActiveCourse: (removeID, addID) => {
    return{
      type: SWITCH_ACTIVE_COURSE,
      addID,
      removeID
    }
  },
  switchActiveSection: (courseID, sectionID) => {
    return{
      type: SWITCH_ACTIVE_SECTION,
      courseID,
      sectionID
    }
  },
  openHelp: () => (
    {
      type: OPEN_HELP
    }
  ),
  closeHelp: () => (
    {
      type: CLOSE_HELP
    }
  ),
  togglePreferencesCard: () => (
    {
      type: TOGGLE_PREFERENCES
    }
  ),
  toggleDesiredCard: () => (
    {
      type: TOGGLE_DESIRED
    }
  ),
  toggleSetRelationship: () => (
    {
      type: TOGGLE_SET_RELATIONSHIP,
    }
  ),
  stageNewRelationship: (courseID) => (
    {
      type: STAGE_NEW_RELATIONSHIP,
      courseID
    }
  ),
  breakFromRelationship: (courseID) => (
    {
      type: BREAK_FROM_RELATIONSHIP,
      courseID
    }
  ),

  cardClicked: (cardID) => (
    {
      type: CARD_CLICKED,
      cardID: cardID
    }
  )
}

//  REDUCERS
const scheduleBuilderReducer = (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_DESIRED_COURSE:
      let desiredMap = Object.assign({}, state.desiredMap);
      let courseID = action.course._id;

      if( desiredMap.data[courseID] ){
        // The course is already in our desired map, remove it
        // Remove it from any relationships
        desiredMap.relationships =
        desiredMap.relationships
        .map((relationship) => {
          return (relationship.filter( (id) => id!==courseID))
        })
        // Remove any null relationships
        .filter( (relationship) => {
          return (relationship.length !== 0)
        });

        // Remove it from active courses
        desiredMap.activeCourseIDs =
        desiredMap.activeCourseIDs.filter( (id) => id!==courseID)

        // Remove our reference to it
        delete desiredMap.data[courseID];
      } else {
        //We don't have the course in our desired map, add it

        //relationships will be added later
        desiredMap.relationships.push( [ courseID ] );

        // Add it to our active courses, courses without relationships
        // must be active
        desiredMap.activeCourseIDs =
        desiredMap.activeCourseIDs.concat(courseID);

        // Add a reference to it
        desiredMap.data[courseID] =
        { activeSectionID: action.course.sectionIDs[0],
          removedSections: [],
        };
      }
      return Object.assign({}, state, {
        desiredMap:desiredMap
      });

    case SWITCH_ACTIVE_COURSE:
      desiredMap = Object.assign({}, state.desiredMap);
      // remove the old active course
      desiredMap.activeCourseIDs = desiredMap.activeCourseIDs
      .filter( (id) => id !== action.removeID);

      // add the new active course
      desiredMap.activeCourseIDs.push(action.addID);
      return Object.assign({}, state, {
        desiredMap:desiredMap
      });

    case SWITCH_ACTIVE_SECTION:
      desiredMap = Object.assign({}, state.desiredMap);
      // set the active course
      desiredMap.data[action.courseID].activeSectionID =
        action.sectionID;

      return Object.assign({}, state, {
        desiredMap:desiredMap
      });

    case OPEN_HELP:
      return Object.assign({},state,{
        isHelpActive: true
      });
    case CLOSE_HELP:
      return Object.assign({},state,{
        isHelpActive: false
      });
    case TOGGLE_PREFERENCES:
      return Object.assign({},state,{
        isPreferencesActive: !state.isPreferencesActive
      });
    case TOGGLE_DESIRED:
      return Object.assign({},state,{
        isDesiredActive: !state.isDesiredActive
      });

    case TOGGLE_SET_RELATIONSHIP:
      let newDesiredMap = Object.assign({}, state.desiredMap);
      if(state.setRelationship){
        newDesiredMap.relationships = newDesiredMap.relationships.filter( rel => {
          return rel.some( id => !state.newRelationship.some(id2 => id===id2))
        })
        newDesiredMap.relationships.push(state.newRelationship);
        newDesiredMap.relationships =
          newDesiredMap.relationships.filter((rel) => rel.length)
      }
      return Object.assign({},state,{
        desiredMap: newDesiredMap,
        setRelationship: !state.setRelationship,
        newRelationship: []
      });
    case BREAK_FROM_RELATIONSHIP:
      newDesiredMap = Object.assign({}, state.desiredMap);

      //remove courseID from any existing relationships
      newDesiredMap.relationships = newDesiredMap.relationships.map( rel =>
        (rel.filter( (id) => id !== action.courseID))
      );
      //add the courseID to a new relationship
      newDesiredMap.relationships.push([action.courseID]);
      //filter any empty relationships
      newDesiredMap.relationships =
          newDesiredMap.relationships.filter((rel) => rel.length)

      return Object.assign({},state,{
        desiredMap: newDesiredMap,
      });

    case STAGE_NEW_RELATIONSHIP:
      let relationship = [];
      relationship = state.newRelationship.concat(relationship);

      if(relationship.length && relationship.some(id => id===action.courseID)){
        relationship = relationship.filter(id => id!==action.courseID);
      }else{
        relationship.push(action.courseID);
      }
      return Object.assign({},state,{
        newRelationship: relationship
      })


    case CARD_CLICKED:
      //remove the subject from expanded cards
      let newExpandedIDs = [];
      if( state.expandedIDs.length !== 0 ){
        newExpandedIDs =
            state.expandedIDs.filter((id) => action.cardID !== id);
      }
      //if it wasn't in expanded cards, add it to expanded cards
      if( newExpandedIDs.length === state.expandedIDs.length ){
        newExpandedIDs.push(action.cardID);
      };

      return Object.assign({},state,{
        expandedIDs: newExpandedIDs
      });

    default:
      return state;
  }
}

export default scheduleBuilderReducer
