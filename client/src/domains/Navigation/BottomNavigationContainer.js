import { connect }      from 'react-redux'
import BottomNavigationComponent  from './BottomNavigationComponent'
import { setRoute }     from '../../routes/AppRouter'

const mapStateToProps = (state, ownProps) => {

  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeRoute: (route) => {
      setRoute(route);
    },
  }
}

const BottomNavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomNavigationComponent)

export default BottomNavigationContainer
