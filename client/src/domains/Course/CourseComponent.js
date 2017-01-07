import React from 'react';
import { COLLECTIONS_ENUM } from '../../dataHandling/dataCache'
import SectionsContainer from '../Section/SectionsContainer'
import style from '../../style'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle-outline';

const toggleIcon = (isDesired, toggleDesiredCourse, course) => {
  if(!isDesired){
    return <AddCircle  onTouchTap={() => toggleDesiredCourse(course)}/>
  } else {
    return <RemoveCircle onTouchTap={() => toggleDesiredCourse(course)}/>
  }
}

const CourseCard = ( {course, courseID, isDesired, toggleDesiredCourse,
                          expanded, cardClicked} ) => (

  <Card expanded={expanded} onExpandChange={()=>cardClicked(courseID)}>
    <CardHeader
      title={course.title}
      subtitle={course.number}
      actAsExpander={true}
      showExpandableButton={true}
      openIcon={toggleIcon(isDesired, toggleDesiredCourse, course)}
      closeIcon={toggleIcon(isDesired, toggleDesiredCourse, course)}
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
