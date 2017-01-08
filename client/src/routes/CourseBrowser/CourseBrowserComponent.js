import React from 'react';
// import SubjectsComponent from '../../domains/Subject/SubjectsComponent'
import SubjectsContainer from '../../domains/Subject/SubjectsContainer'
import SchedPrefContainer from '../../domains/SchedulePreferences/SchedPrefContainer'
import BottomNavigationContainer from '../../domains/Navigation/BottomNavigationContainer'
import AppBarComponent from '../../domains/Navigation/AppBarComponent'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import style from '../../style'

import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';


let SchedulePreferencesCard = ({activeLinks} ) => (
  <Card>
    <CardHeader
      title={'Preferences'}
      actAsExpander={true}
      showExpandableButton={true}
    />

  <CardText style={style.wrapper} expandable={false}>
      {activeLinks.map((link) =>
        <Chip labelStyle={style.chipLabel}
              style={style.chip}>{link.name}</Chip>)}
    </CardText>

    <CardText expandable={true}>
      <SchedPrefContainer />
    </CardText>
  </Card>
)


let SearchBar = ({ currentFilter, updateFilter }) => (
  <Paper zDepth={2} style={style.searchBarContainer}>
    <TextField  hintText="search subjects"
                hintStyle={{marginLeft: '35%'}}
                inputStyle={{textAlign:'center'}}
                onChange={ e => updateFilter(e.target.value) }
                value={currentFilter}
                // floatingLabelText="MultiLine and FloatingLabel"
                style={style.SearchBar}
                fullWidth={true}
                underlineShow={false} />
  </Paper>

)

class CourseBrowserComponent extends React.Component{
  constructor( {subjectIDs, helpActive, currentFilter, activeLinks,
                  openHelp, closeHelp, loadSubjects, updateFilter} ){
    super();;
  }

  componentWillMount(){
    let my=this.props;
    if(!my.subjectIDs.length) my.loadSubjects();
  }

  render(){
    let my=this.props;
    if(!my.subjectIDs.length) return <div>loading</div>
    return (
      <div style={style.appPage}>
        <AppBarComponent helpActive={my.helpActive}
                        openHelp={my.openHelp}
                        closeHelp={my.closeHelp}
                        title={'Course Browser'}
                        helpText={'The Course Browser - first select which semester and campusi you are interested in, then you can click a subject to view the course offerings for your selection. Subjects may be searched with the filter bar at the bottom. Courses can then be added to your schedule builder by clicking the + or you can click the title and view more info.'}/>
        <br />
        <div>
          <SchedulePreferencesCard activeLinks={my.activeLinks} />
        </div>
        <br />
        <div>
          <SubjectsContainer subjectIDs={my.subjectIDs} />
        </div>
        <br />
        <SearchBar  currentFilter={my.currentFilter}
                    updateFilter={my.updateFilter}/>
        <BottomNavigationContainer />
      </div>
    )
  }
}

// CourseBrowserComponent.propTypes = {
//
// }

export default CourseBrowserComponent
