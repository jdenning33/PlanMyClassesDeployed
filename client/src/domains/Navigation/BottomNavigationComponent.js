import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import { ROUTE_ENUM } from '../../routes/AppRouter';
import style from '../../style'


const buildIcon = <FontIcon className="material-icons">build</FontIcon>;
const setIcon = <FontIcon className="material-icons">set</FontIcon>;
const addIcon = <FontIcon className="material-icons">add</FontIcon>;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
const BottomNavigationComponent = ({fixed=true, changeRoute}) => {

  // select = (index) => this.setState({selectedIndex: index});
  let path = window.location.pathname;

  let index = -1;
  if(path === '/') index = 0;
  if(path === '/schedule-builder') index = 2;
  if(path === '/set-relationships') index = 1;
  if(path === '/course-browser') index = 0;

  return (
    <Paper style={fixed?style.footer:null} zDepth={1}>
      <BottomNavigation selectedIndex={index}>
        <BottomNavigationItem
          label="COURSES"
          icon={addIcon}
          onTouchTap={() => changeRoute(ROUTE_ENUM.COURSE_BROWSER)}
        />
        <BottomNavigationItem
          label="RELATIONSHIPS"
          icon={setIcon}
          onTouchTap={() => changeRoute(ROUTE_ENUM.SET_RELATIONSHIPS)}
        />
        <BottomNavigationItem
          label="SCHEDULE"
          icon={buildIcon}
          onTouchTap={() => changeRoute(ROUTE_ENUM.SCHEDULE_BUILDER)}
        />
      </BottomNavigation>
    </Paper>
  );

}

export default BottomNavigationComponent;
