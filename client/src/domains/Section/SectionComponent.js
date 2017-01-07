import React from 'react';
import { COLLECTIONS_ENUM } from '../../dataHandling/dataCache'
import style from '../../style'

import {Card, CardHeader, CardText} from 'material-ui/Card';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


const SectionCard = ( {section, sectionID, expanded,
  cardClicked, toggleDesiredSection} ) => {

  let instructors = section.instructors;
  let primaryInstructor = instructors[0];
  let name = null;
  if(primaryInstructor){
    let primaryInstructorName = primaryInstructor.name;
    name = primaryInstructorName.first + ' ' + primaryInstructorName.last;
  }

  return(
    <Card expanded={expanded} onExpandChange={() => cardClicked(sectionID)}>
      <CardText style={style.sectionCardTime} expandable={false}>
        <Times times={section.times} />
        {/* <SectionsContainer sectionIDs={course.sectionIDs} /> */}
      </CardText>

      <CardHeader
        title={section.number}
        subtitle={name}
        actAsExpander={true}
        // showExpandableButton={true}
      />

      <CardText expandable={true}>
        <div>crn: {section.crn}</div>
        {/* <SectionsContainer sectionIDs={course.sectionIDs} /> */}
      </CardText>

      {/* <CardActions expandable={true}>
        <FlatButton label="Discard"
          onTouchTap={() => toggleDesiredSection(sectionID)} />
        <FlatButton label="Add"
          onTouchTap={() => toggleDesiredSection(sectionID)} />
      </CardActions> */}

    </Card>
  )
};

const Times = ({times}) => {
  let sTimes = times.sort( (a,b) => a.start - b.start );

  return (
    <div>
      {sTimes.map( (time, index) => {
        return (
          <div key={index}>
            {time.days} {time.start} - {time.end}
          </div>)
      })}
    </div>
  )
};

const LoadingComponent = ( ) => (
  <div>
    loading
  </div>
);

class SectionComponent extends React.Component{
  constructor({section, sectionID, expanded, fetchingIDs,
                              cardClicked, getData}){
    super();
  }

  componentWillMount(){
    let my = this.props;
    if(!my.section){
      if(!my.fetchingIDs.length || !my.fetchingIDs.some(id=>id===my.sectionID)) {
        my.getData(my.sectionID, COLLECTIONS_ENUM.SECTIONS)
      };
    }
  }

  render(){
    let my = this.props;
    if(!my.section) return <LoadingComponent />
    return SectionCard(this.props)
  }
}


export default SectionComponent
