import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducer from './reducer'
import AppRouter from './routes/AppRouter'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


//  creates a store from the apps root reducer
//  this is where the application state is stored
const store = createStore(
  reducer,
  applyMiddleware( reduxThunk )
);

//  where to render. Attaches to html <div id='root'>
const MOUNT_NODE = document.getElementById('root');

var page = (
  <Provider store={store}>
    <MuiThemeProvider>
      <AppRouter />
    </MuiThemeProvider>
  </Provider>
);

render(
  page,
  MOUNT_NODE
);
