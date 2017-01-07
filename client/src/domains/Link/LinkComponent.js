import React, { PropTypes } from 'react'

const LinkComponent = ( { text, active, onClick } ) => (

    <a href="#" onClick={
        e => {
          e.preventDefault()
          onClick()
        }
      }>
    { (active)? <b>{text}</b> : text }
    </a>
)

LinkComponent.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default LinkComponent
