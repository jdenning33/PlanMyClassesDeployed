import React from 'react'

const dayValue = {
  M:1, T:2, W:3, R:4, F:5, S:6, U:7
}
const getDayValue = (x) => {
  let y = dayValue[x];
  if(y) return y;
  return 0;
}

const toCivilian = (time) => {
  let civTime = time;
  let ampm = 'am';
  if(civTime > 1200){
    if(civTime >= 1300) civTime-=1200;
    ampm = 'pm';
  }
  return (civTime + ' ' + ampm);
}

const CivTimeBlock = ( {time} ) => {
  let start = toCivilian(time.start);
  let end = toCivilian(time.end);
  return(
    <span>[ {start} - {end} ]</span>
  )
}

const TimeByDay = ( {time} ) => (
  <span>
    {time
    .sort( (a,b) => a.start-b.start)
    .map( (time) => {
      return <CivTimeBlock key={time.start} time={time} />
    })}
    <br />
  </span>
)



const ScheduleTimeComponent = ( { times } ) => {

  return (
    <span>
      {Object.keys(times)
      .sort( (a,b) => getDayValue(a) - getDayValue(b))
      .map( (day) => {
        return (
          <span>
            {day}
            <TimeByDay key={day} time={times[day]} />
          </span>
        )
      })}
    </span>
  )
}

export default ScheduleTimeComponent
