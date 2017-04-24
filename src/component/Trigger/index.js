'use strict'

const _ = require('lodash')
    , React = require('react')
    , H = require('horten')
    , Base = require('../Base')
    , YAML = require('../YAML')

function now() { return new Date().getTime() }

class Trigger extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'trigger'
  }

  renderSelf() {
    const title = this.props.title
        , trigger = this.props.trigger
        , className = []

    var text = title
    if ( !text && !_.isUndefined( trigger ) )
      text = ( <YAML data={ trigger } /> )



    return (
      <button
        className="unselected"
        onClick={ this.onMouse.bind( this, 'click' ) }
        onMouseEnter={ this.onMouse.bind( this, 'enter' ) }
        onMouseMove={ this.onMouse.bind( this, 'move' ) }
        onMouseDown={ this.onMouse.bind( this, 'down' ) }
        onMouseUp={ this.onMouse.bind( this, 'up' ) }

        onMouseLeave={ this.onMouse.bind( this, 'leave' ) }

        ref={ ( button ) => this.button = button }
        >{ text }</button>
    )
  }

  onTouch( type, event ) {
    // console.log( 'onTouch', type, event )
  }

  onMouse( type, event ) {
    var elem = this.button
      , classList = elem.classList

    switch ( type ) {
      case 'down':
        classList.add('down')
        this.trigger()
        event.preventDefault()
      break

      case 'enter':
        if ( event.buttons ) {
          classList.add('down')
          this.trigger()
        }
      break

      case 'up':
      case 'leave':
        classList.remove('down')
      break
    }
  }

  trigger() {
    var value

    if ( this.props.toggle ) {
      value = !this.state.cursor.value
    } else if ( !_.isUndefined( this.props.trigger ) ) {
      value = this.props.trigger
    } else {
      value = now()
    }

    if ( !_.isUndefined( value ) )
      this.onUserInput( value )
  }

  onValueSelf( value ) {
    const ourValue = this.props.trigger
        , elem = this.button
        , classList = elem.classList

    var selected

    if ( !_.isUndefined( ourValue ) ) {
      selected = ourValue == value
    } else {
      selected = !!value
    }

    if ( selected ) {
      classList.add('selected')
    } else {
      classList.remove('selected')
    }
  }


}

module.exports = Trigger
