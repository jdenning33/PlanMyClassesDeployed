import React from 'react';
import { COLLECTIONS_ENUM } from '../../dataHandling/dataCache'
import SectionContainer from '../Section/SectionContainer'
import { dataCache } from '../../dataHandling/dataCache'
import style from '../../style'
import Slider from 'react-slick'
import Carousel from '../../Components/Carousel'


const Title = ( {course, cardClicked} ) => {
  return (
    <div>
      <span> ~ {course.number}: {course.title}</span>
    </div>
  )
}

const SectionCarousel = ( {sectionIDs, setActive} ) => (
  <div style={style.carousel}>
    <TestCarousel sectionIDs={sectionIDs} setActive={setActive} />
    {sectionIDs.map( (sectionID) => {
      return <SectionContainer  style={style.courseBox}
                                key={sectionID}
                                sectionID={sectionID} />
    })}
  </div>
);


const TestCarousel = ( {sectionIDs, setActive} ) => {
  let elements = sectionIDs.map( (sectionID) => {
    let iStyle = style.carouselSection;
    return (
      <div key={sectionID} style={iStyle}>
        <SectionContainer  sectionID={sectionID} />
      </div>
    )
  });

  return(
    <Carousel elements={elements}
              afterChange={setActive} />
  )
}

const SectionChunk = ( {sectionChunk, active, setActive} ) => {
  let sectionIDs = Object.keys(sectionChunk.sectionIDs);
  sectionIDs = sectionIDs.sort( (id1, id2) => {
    return  (sectionChunk.sectionIDs[id1].secondaryTimes[0].start -
             sectionChunk.sectionIDs[id2].secondaryTimes[0].start)
  });

  return(
    <div>
      {sectionChunk.primaryTime.start} - {sectionChunk.primaryTime.end}
      {active ? <SectionCarousel sectionIDs={sectionIDs}
                                  setActive={setActive}/> : null}

    </div>
  )
}

const ExpandedCourseComponent = ( {course, reducedCourseJSON, active, setActive} ) => {

  let sortedChunks = reducedCourseJSON.sort( (chunk1, chunk2) => (
    chunk1.primaryTime.start - chunk2.primaryTime.start
  ));

  return(
    <div>
      <Title  course={course} />

      {sortedChunks.map( (sectionChunk) => {
          return <SectionChunk  key={sectionChunk.primaryTime.start}
                                sectionChunk={sectionChunk}
                                active={true}
                                setActive={setActive} />
      })}
    </div>
  )
}


class ReducedCourseComponent extends React.Component{
  constructor({course, courseID, expanded, fetchingIDs,
                              cardClicked, getData, setActive}){
    super();
  }

  componentWillMount(){
    let my = this.props;
    dataCache.deepLoadCourses([my.courseID], my.getData);
  }


  render(){
    let my = this.props;
    if(!my.ready) return (<div>loading</div>);
    return (<ExpandedCourseComponent  course={my.course}
                                      reducedCourseJSON={my.reducedCourseJSON}
                                      active={my.active}
                                      setActive={my.setActive}/>);

  }
}


export default ReducedCourseComponent
