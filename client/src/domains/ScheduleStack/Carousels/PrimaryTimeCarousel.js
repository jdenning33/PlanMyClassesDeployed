import React from 'react';
import style from '../../../style'
import Carousel from '../../../Components/Carousel'
import Paper from 'material-ui/Paper';


const TimePaper = ({primaryTime, active}) => {
  let z = (active)?1:2;
  let iStyle = (active)?style.timeActiveCarouselPaper :
                        style.timeCarouselPaper;
  return (
    <Paper style={iStyle} zDepth={z}>
      <div>
        {primaryTime.days}: {primaryTime.start}-{primaryTime.end}
      </div>
    </Paper>
  )
}


const PrimaryTimeCarousel = ({timesJSON, activeTime, afterChange}) => {
  let sortedTimes = timesJSON.sort( (a,b) => {
    if(!a.primaryTime || !b.primaryTime) return 0;
    return (a.primaryTime.start - b.primaryTime.start)
  })

  let elements = sortedTimes.map( (timeJSON, index) => {

    let primaryTime = timeJSON.primaryTime;
    let active = (primaryTime.start === activeTime.start &&
                  primaryTime.end   === activeTime.end);

    let iStyle = active ? style.activeCarouselItem : style.carouselItem;

    return(
      <div  style={iStyle}
             key={index}>
        <TimePaper   primaryTime={primaryTime}
                    active={active} />
      </div>
    )
  });

  return(
    <div style={style.primaryTimeCarousel}>
      <Carousel elements={elements}
                initialSlide={
                    sortedTimes.findIndex(time =>
                      time.primaryTime.start === activeTime.start)
                  }
                afterChange={afterChange} />
    </div>
  )
}

export default PrimaryTimeCarousel
