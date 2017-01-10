import React from 'react';
import style from '../../style'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Help from 'material-ui/svg-icons/action/help-outline';
import Dialog from 'material-ui/Dialog';
// import $ from 'jquery'




const AppBarComponent = ({title, helpText, helpActive, openHelp, closeHelp}) => (
  <div style={style.header}>
    <AppBar
      title={<span>{title}</span>}
      onTitleTouchTap={()=>null}
      showMenuIconButton={false}
      iconElementRight={
        <IconButton onTouchTap={() => openHelp()}>
          <Help />
        </IconButton>}
    />
  <CourseBrowserHelp  helpText={helpText}
                      active={helpActive}
                      open={openHelp}
                      close={closeHelp} />
  </div>
)

const CourseBrowserHelp = ({helpText, active, open, close}) => (
  <div>
    <Dialog
      modal={false}
      open={active}
      onRequestClose={() => close()}>
      <span>{helpText}</span>
    </Dialog>
  </div>
  )

export default AppBarComponent
