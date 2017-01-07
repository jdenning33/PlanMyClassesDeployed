import React, { PropTypes } from 'react'
import PrefLinksComponent from './PrefLinks/PrefLinksComponent'
import { CAMPUS_ENUM, SEMESTER_ENUM } from './schedPrefDuck'
import style from '../../style'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


const SchedPrefComponent = ( {activeLinks,  setCampusClick,
                                            setSemesterClick,
                                            setOnlineDesireClick} ) => {
  return (
    <div>
      <Card>
        <CardHeader
          title={'Campus'}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions style={style.courseBrowserCard} expandable={true}>
            <PrefLinksComponent ENUM={CAMPUS_ENUM}
                                activeLinks={activeLinks}
                                action={(campus) => setCampusClick(campus)} />
        </CardActions>
      </Card>

      <Card>
        <CardHeader
          title={'Semester'}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText style={style.courseBrowserCard} expandable={true}>
          <PrefLinksComponent ENUM={SEMESTER_ENUM}
                              activeLinks={activeLinks}
                              action={(semester) => setSemesterClick(semester)} />
        </CardText>
      </Card>
    </div>
  )
}

SchedPrefComponent.propTypes = {
  activeLinks: PropTypes.array.isRequired
}

export default SchedPrefComponent
