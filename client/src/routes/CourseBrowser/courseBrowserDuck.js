
//  CONSTANTS
const initialState = {
  expandedIDs: {},
  subjectIDs : ['586477cbc5d24f47c82d20f9',
                '586477cbc5d24f47c82d20fa',
                '586477cbc5d24f47c82d20fb'],
  filter: '',
  isHelpActive: false,
}

//  ACTIONS
const CARD_CLICKED = 'courseBrowser/CARD_CLICKED';
const EXPAND_CARD = 'courseBrowser/EXPAND_CARD';
const COLLAPSE_CARD = 'courseBrowser/COLLAPSE_CARD';
const OPEN_HELP = 'courseBrowser/OPEN_HELP';
const CLOSE_HELP = 'courseBrowser/CLOSE_HELP';
const UPDATE_FILTER = 'courseBrowser/UPDATE_FILTER';

//  ACTION CREATORS
export const courseBrowser = {

  cardClicked: (cardID) => (
    {
      type: CARD_CLICKED,
      cardID: cardID
    }
  ),
  expandCard: (cardID) => (
    {
      type: EXPAND_CARD,
      cardID: cardID
    }
  ),
  collapseCard: (cardID) => (
    {
      type: COLLAPSE_CARD,
      cardID: cardID
    }
  ),
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
  updateFilter: (value) => (
    {
      type: UPDATE_FILTER,
      value
    }
  )
}

//  REDUCERS
const courseBrowserReducer = (state = initialState, action) => {
  switch (action.type) {

    case CARD_CLICKED:
      let path = window.location.pathname;
      //remove the subject from expanded cards
      let newExpandedIDs = state.expandedIDs;
      if( !newExpandedIDs[path] ) newExpandedIDs[path] = [];
      let preLength = newExpandedIDs[path].length;

      if( newExpandedIDs[path].length !== 0 ){
        newExpandedIDs[path] =
            newExpandedIDs[path].filter((id) => action.cardID !== id);
      }

      //if it wasn't in expanded cards, add it to expanded cards
      if( newExpandedIDs[path] && newExpandedIDs[path].length === preLength ){
        newExpandedIDs[path].push(action.cardID);
      };

      return Object.assign({},state,{
        expandedIDs: newExpandedIDs
      });
      case EXPAND_CARD:
        path = window.location.pathname;
        //remove the subject from expanded cards
        newExpandedIDs = state.expandedIDs;
        if( !newExpandedIDs[path] ) newExpandedIDs[path] = [];
        preLength = newExpandedIDs[path].length;

        if( newExpandedIDs[path].length !== 0 ){
          newExpandedIDs[path] =
              newExpandedIDs[path].filter((id) => action.cardID !== id);
        }
        //add it to expanded cards
        newExpandedIDs[path].push(action.cardID);

        return Object.assign({},state,{
          expandedIDs: newExpandedIDs
        });
      case COLLAPSE_CARD:
        path = window.location.pathname;
        //remove the subject from expanded cards
        newExpandedIDs = state.expandedIDs;
        if( !newExpandedIDs[path] ) newExpandedIDs[path] = [];
        preLength = newExpandedIDs[path].length;

        if( newExpandedIDs[path].length !== 0 ){
          newExpandedIDs[path] =
              newExpandedIDs[path].filter((id) => action.cardID !== id);
        }

        return Object.assign({},state,{
          expandedIDs: newExpandedIDs
        });

    case OPEN_HELP:
      return Object.assign({},state,{
        isHelpActive: true
      });
    case CLOSE_HELP:
      return Object.assign({},state,{
        isHelpActive: false
      });

    case UPDATE_FILTER:
      return Object.assign({},state,{
        filter: action.value
      });

    default:
      return state
  }
}

export default courseBrowserReducer
