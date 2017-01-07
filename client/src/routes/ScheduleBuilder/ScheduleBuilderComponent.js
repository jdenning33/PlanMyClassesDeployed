import React from 'react'
// import SchedulesContainer from '../../domains/Schedule/SchedulesContainer'
import ScheduleStackContainer from '../../domains/ScheduleStack/ScheduleStackContainer'
import BottomNavigationContainer from '../../domains/Navigation/BottomNavigationContainer'
import AppBarComponent from '../../domains/Navigation/AppBarComponent'

import style from '../../style'

import {Card, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';


let ScheduleStackCard = ({stackMap, activeCRNs, courseIDs}) => (
  <Card style={style.scheduleStackCard} expanded={true} onExpandChange={() => null}>
    {/* <CardHeader
      title={'Schedule Stack'}
      actAsExpander={false}
      // showExpandableButton={true}
    /> */}
    <br/>
    <CardText style={style.wrapper} expandable={false}>
      CRNs:
        {activeCRNs.map((crn) =>
          <Chip labelStyle={style.chipLabel}
                style={style.chip}>{crn}</Chip>)}
    </CardText>
    <CardText expandable={true}>
      <ScheduleStackContainer stackMap={stackMap}
                              courseIDs={courseIDs} />
    </CardText>
  </Card>
);

const ScheduleBuilderComponent = ( {
    helpActive, courseIDs, stackMap, courses, activeLinks, activeCRNs, setRelationship,
              openHelp, closeHelp, toggleSetRelationship, changeRoute} ) => (

  <div style={style.window}>
    <div style={style.contentHiderLeft} />

    <div style={style.appPage}>
        <AppBarComponent  helpActive={helpActive}
                          openHelp={openHelp}
                          closeHelp={closeHelp}
                          title={'Schedule Builder'}
                          helpText={'How to use the schedule builder:'}/>
      <br />
      <div>
        <ScheduleStackCard stackMap={stackMap}
                                courseIDs={courseIDs}
                                activeCRNs={activeCRNs} />
      </div>
      <div>
        <BottomNavigationContainer />
      </div>

      <br />
    </div>

    <div style={style.contentHiderRight} />
  </div>
)

export default ScheduleBuilderComponent
