import { connect } from 'react-redux'
import LinkComponent from './LinkComponent'

const mapStateToProps = (state, ownProps) => {
  let tActive =
      (typeof(ownProps.active) === "undefined")? false : ownProps.active;
  return {
    text: ownProps.text,
    active: tActive
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      ownProps.clickAction()
    }
  }
}

const LinkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkComponent)

export default LinkContainer
