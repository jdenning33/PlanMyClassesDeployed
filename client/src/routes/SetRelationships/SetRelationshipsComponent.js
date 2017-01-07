import React from 'react'
import BottomNavigationContainer from '../../domains/Navigation/BottomNavigationContainer'
import AppBarComponent from '../../domains/Navigation/AppBarComponent'
import CoursesContainer from '../../domains/Course/CoursesContainer'
import { ROUTE_ENUM } from '../../routes/AppRouter';

import style from '../../style'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/RaisedButton';
// import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';


let DesiredCoursesCard = ({courseIDs, courses, stackMap, setRelationship,
                                  toggleSetRelationship, changeRoute}) => (
  <Card initiallyExpanded={true}>
    <CardHeader
      title={'Desired Courses'}
      actAsExpander={true}
      showExpandableButton={true}
    />

   <CardText style={style.wrapper} expandable={false}>
      {courses? stackMap.relationships.map( (relationship, index) => (
        <Chip labelStyle={style.chipLabel} style={style.chip} key={index}>
          {(courses[relationship[0]])?courses[relationship[0]].number : null}
          {relationship.map(courseID => (
            (courseID === relationship[0]) ? null :
            <span key={courseID}> or {courses[courseID] ? courses[courseID].number : null}</span>
            )
          )}
        </Chip>
      )) : null}
    </CardText>

    <CardText expandable={true}>
      {stackMap.relationships.map( (relationship, index) => (
        <div key={index}>
          <CoursesContainer
            setRelationship={setRelationship}
            courseIDs={relationship}
            toggleSetRelationship={toggleSetRelationship}/>
          <br />
        </div>
      ))}
    </CardText>
    <CardActions expandable={true}>
      <FlatButton label={!setRelationship?
          "New Relationship " : "Save Relationship"}
          primary={setRelationship}
          secondary={!setRelationship}
        onTouchTap={() => toggleSetRelationship()} />
      <FlatButton label="Add Courses"
        secondary={false} onTouchTap={() => changeRoute(ROUTE_ENUM.COURSE_BROWSER)} />
    </CardActions>
  </Card>
);

const SetRelationshipComponent = ( {
    helpActive, courseIDs, stackMap, courses, activeLinks, setRelationship,
              openHelp, closeHelp, toggleSetRelationship, changeRoute} ) => (

  <div style={style.window}>
    <div style={style.contentHiderLeft} />

    <div style={style.appPage}>
        <AppBarComponent  helpActive={helpActive}
                          openHelp={openHelp}
                          closeHelp={closeHelp}
                          title={'Set Relationships'}
                          helpText={'How to use the schedule builder:'}/>
      <br />
        {/* <span style={{width:'100%', maxWidth:'500px', position:'fixed', top:'150px'}}>
          <RaisedButton style={
              {float:'right', marginRight:'20px'}}
            secondary={true}
            label={!setRelationship?
              "New " : "Save"}
            onTouchTap={() => toggleSetRelationship()} />
          </span> */}
      <div>
        <DesiredCoursesCard courseIDs={courseIDs}
                            setRelationship={setRelationship}
                            stackMap={stackMap}
                            courses={courses}
                            changeRoute={changeRoute}
                            toggleSetRelationship={toggleSetRelationship}/>
      </div>
      <br /> <br />
      <div>
        <BottomNavigationContainer />
      </div>

      <br />
    </div>

    <div style={style.contentHiderRight} />
  </div>
)

export default SetRelationshipComponent
