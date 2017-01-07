import { connect } from 'react-redux'
import ClickableComponent from './ClickableComponent'

const mapStateToProps = (state, ownProps) => {
  let tActive =
      (typeof(ownProps.active) === "undefined")? false : ownProps.active;
  return {
    node: ownProps.node,
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

const ClickableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClickableComponent)

export default ClickableContainer
