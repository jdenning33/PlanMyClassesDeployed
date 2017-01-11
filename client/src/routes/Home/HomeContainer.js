import { connect }      from 'react-redux'
import HomeComponent    from './HomeComponent'
import { setRoute }     from '../AppRouter'
import dataAPI, { COLLECTIONS_ENUM }  from '../../apis/dataAPI'
import { dbCommitJsonModel } from '../../dataHandling/dbCommitJsonModel'
import buildUnmJsonModel from '../../dataHandling/buildUnmJsonModel'
import collapseUnmJsonModel from '../../dataHandling/collapseUnmJsonModel'
import commitUnmJsonToDb from '../../dataHandling/commitUnmJsonToDb'

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeRoute: (route) => {
      setRoute(route);
    },
    eraseDB: () => {
      dataAPI.delete( { type: COLLECTIONS_ENUM.SUBJECTS    } );
      dataAPI.delete( { type: COLLECTIONS_ENUM.COURSES     } );
      dataAPI.delete( { type: COLLECTIONS_ENUM.SECTIONS    } );
      dataAPI.delete( { type: COLLECTIONS_ENUM.INSTRUCTORS } );
    },
    populateDB: () => {
      dbCommitJsonModel();
    },
    buildUnmJsonModel: () => {
      buildUnmJsonModel()
      .then(( json) => {
        console.log(json);
        console.log(collapseUnmJsonModel(json));
      })
      .catch( (err) => console.log(err) );
    },
    populateCollapsedModel: () => {
      commitUnmJsonToDb();
    }
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent)

export default HomeContainer
