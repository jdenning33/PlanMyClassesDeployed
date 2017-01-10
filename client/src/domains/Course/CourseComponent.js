import React from 'react';
import { COLLECTIONS_ENUM } from '../../dataHandling/dataCache'
import SectionsContainer from '../Section/SectionsContainer'
import style from '../../style'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle-outline';



const toggleIcon = (ready, isDesired, toggleDesiredCourse, course, courseID, cardClicked) => (
  <span style={style.addButtonContainer}>
    {!isDesired ?
      <AddCircle  color={ ready ? '#111' : '#777' }
                  style={{margin:'12px'}}
                  onTouchTap={() => {
                    cardClicked(courseID);
                    toggleDesiredCourse(course)
                  }}/>
      :
      <RemoveCircle   color={ ready ? '#111' : '#777' }
                      style={{margin:'12px'}}
                      onTouchTap={() => {
                        cardClicked(courseID);
                        toggleDesiredCourse(course)
                      }}/>
    }
  </span>
)

const CourseCard = ( {course, courseID, isDesired, toggleDesiredCourse,
                          ready=true, expanded, cardClicked} ) => (

  <Card expanded={expanded}
    onExpandChange={()=>cardClicked(courseID)}>
    <CardHeader
      title={course.title}
      subtitle={course.number}
      actAsExpander={true}
      style={{flex:'1'}}
      // showExpandableButton={true}
      children={toggleIcon(ready, isDesired, toggleDesiredCourse, course, courseID, cardClicked)}
      // openIcon ={toggleIcon(ready, isDesired, toggleDesiredCourse, course, courseID, cardClicked)}
      // closeIcon={toggleIcon(ready, isDesired, toggleDesiredCourse, course, courseID, cardClicked)}
    />
    <CardText style={style.courseBrowserCard} expandable={true}>
      {course.description}
      <br />
      <br />
      <SectionsContainer sectionIDs={course.sectionIDs} />
    </CardText>
    <CardActions expandable={true}>
      <FlatButton label={!isDesired? 'Add to Schedule' : 'Remove from Schedule'}
                  onTouchTap={() => toggleDesiredCourse(course)} />
    </CardActions>
  </Card>

);

const LoadingComponent = ( ) => (
  <div>
    loading
  </div>
);

class CourseComponent extends React.Component{
  constructor({course, courseID, isDesired, fetchingIDs, expanded,
                    toggleDesiredCourse, getData, cardClicked}){
    super();
  }

  componentWillMount(){
    let my = this.props;
    if(!my.course){
      if(!my.fetchingIDs.length || !my.fetchingIDs.some(id=>id===my.courseID)) {
        if(my.courseID) my.getData(my.courseID, COLLECTIONS_ENUM.COURSES)
      };
    }
  }

  render(){
    let my = this.props;
    if(!my.course) return <LoadingComponent />
    return CourseCard(this.props);
  }
}


export default CourseComponent
