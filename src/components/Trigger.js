import _ from 'lodash'
import React from 'react'
import Control from '../base/Control'
import YAML from './YAML'

function now() { return new Date().getTime() }

export default class Trigger extends Control {
  constructor( props ) {
    super( props )
    this.state.type = 'trigger'
  }

  render() {
    const title = this.props.title
    const trigger = this.props.trigger

    var text = title
    if ( !text && !_.isUndefined( trigger ) )
      text = ( <YAML data={ trigger } /> )

    let className = this.props.className || ''
    className += 'horten control button unselected'


    if ( this.state.selected ) 
      className += ' selected'
    
    if ( _.isString( this.props.colour ) )
      className += ' colour-'+this.props.colour 
    

    // text = JSON.stringify( this.props )

    return (
      <span
        className={ className }
        onClick={ this.onMouse.bind( this, 'click' ) }
        onMouseEnter={ this.onMouse.bind( this, 'enter' ) }
        onMouseMove={ this.onMouse.bind( this, 'move' ) }
        onMouseDown={ this.onMouse.bind( this, 'down' ) }
        onMouseUp={ this.onMouse.bind( this, 'up' ) }

        onMouseLeave={ this.onMouse.bind( this, 'leave' ) }

        ref={ ( button ) => this.button = button }
      >{ text }</span>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    this.onValueSelf( this.state.cursor.value )
  }

  

  onTouch( type, event ) {
    // console.log( 'onTouch', type, event )
  }

  onMouse( type, event ) {
    var elem = this.button
    const classList = elem.classList

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

    if ( !_.isUndefined( value ) ) {
      this.onValueSelf( value )
      this.onUserInput( value )
    }
  }

  onValueSelf( value ) {
    const ourValue = this.props.trigger


    var selected

    function compare( a, b ) {
      if ( a == b ) return true
      if ( _.isObject( a ) && !_.isUndefined( b ) ) {
        for ( let key in a ) 
          if ( !compare( a[key], b[key] ) )
            return false
        
        return true
      }

      return a == b
    }

    if ( !_.isUndefined( ourValue ) ) {
      selected = compare( ourValue, value )
    } else {
      selected = !!value
    }

    this.state.selected = selected
    const elem = this.button

    if ( !elem )
      return 

    const classList = elem.classList
    if ( selected ) {
      classList.add('selected')
      // classList.remove('unselected')
    } else {
      classList.remove('selected')
      // classList.add('unselected')
    }
  }
}

