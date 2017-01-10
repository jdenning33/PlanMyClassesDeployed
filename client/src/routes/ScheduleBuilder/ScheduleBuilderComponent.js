import React from 'react'
// import SchedulesContainer from '../../domains/Schedule/SchedulesContainer'
import ScheduleStackContainer from '../../domains/ScheduleStack/ScheduleStackContainer'
import BottomNavigationContainer from '../../domains/Navigation/BottomNavigationContainer'
import AppBarComponent from '../../domains/Navigation/AppBarComponent'
import style from '../../style'

import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';


let ScheduleStackCard = ({stackMap, activeCRNs, courseIDs}) => (
  <Card >
    <CardHeader
      // title={'Schedule Stack'}
      // actAsExpander={false}
      // showExpandableButton={true}
    >
    <br/>
    <CardText style={style.wrapper} expandable={false}>
      CRNs:
        {activeCRNs.map((crn) =>
          <Chip key={crn}
                labelStyle={style.chipLabel}
                style={style.chip}>{crn}</Chip>)}
    </CardText>
    </CardHeader>
    <CardText expandable={false}>
      <ScheduleStackContainer stackMap={stackMap}
                              courseIDs={courseIDs} />
    </CardText>
  </Card>
);

const ScheduleBuilderComponent = ( {
    helpActive, courseIDs, stackMap, courses, activeLinks, activeCRNs, setRelationship,
              openHelp, closeHelp, toggleSetRelationship, changeRoute} ) => (

  <div style={style.appPage}>
    <AppBarComponent  helpActive={helpActive}
                      openHelp={openHelp}
                      closeHelp={closeHelp}
                      title={'Schedule Builder'}
                      helpText={'The Schedule Stack - congrats you made it to the schedule builder. Each slider below represents the options you have for a given course offering. Slide items to the left or to the right to mix and match your schedule! When you are done, you can simply write down your CRNs at the top of the page and provide them to the UNM "Register for Classes" site.'}/>
    <br />
    <div>
    <ScheduleStackCard stackMap={stackMap}
                            courseIDs={courseIDs}
                            activeCRNs={activeCRNs} />
    </div>
    <br/>
    <BottomNavigationContainer fixed={false}/>
  </div>
)

export default ScheduleBuilderComponent
