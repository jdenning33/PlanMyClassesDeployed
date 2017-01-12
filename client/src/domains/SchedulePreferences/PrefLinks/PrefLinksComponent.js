import React from 'react'
import FlatButton from 'material-ui/FlatButton';


//  Individual Link
const SetPrefLink = ( {preference, active, action} ) => (
  <FlatButton   label={preference.name}
                primary={active}
                onTouchTap={() => action(preference)} />
)

//  Displays a set of links delimmited by a '-'
const PrefLinksComponent = ( { ENUM, activeLinks, action } ) => {
  var preferences = [];
  for(let preference in ENUM){
    if(preference != null) {
      preferences.push(ENUM[preference]);
    }
  };

  return (
    <span>
      {preferences.map((pref) => (
          <SetPrefLink  key={pref.key}
                        preference={pref}
                        active={activeLinks.some( (p) => p===pref)}
                        action={(pref) => action(pref)} />
        )
      )}
    </span>
  )
}

export default PrefLinksComponent
