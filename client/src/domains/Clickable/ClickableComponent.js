import React, { PropTypes } from 'react'

const ClickableComponent = ( { node, active, onClick } ) => (

    <a href="#" onClick={
        e => {
          e.preventDefault()
          onClick()
        }
    }>
    {node}
    </a>
)

ClickableComponent.propTypes = {
  node: PropTypes.element.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ClickableComponent
