'use strict'

const React = require('react')
  , Base = require('../Base')
import TextareaAutosize from 'react-textarea-autosize'
require('./index.less')

class Text extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'text'
    this.state = this.state || {}
    this.state.value = 'parseFloat( this.props.defaultValue ) || 0'
  }

  renderSelf() {
    let size = parseInt( this.props.size ) || 24
    return (
      <input
        className='button text unselected'
        type="text"
        size= { size }
        defaultValue={ this.state.value }
        ref={(node) => this.inputText = node }
        onFocus={ this.onTextFocus.bind( this ) }
        onBlur={ this.onTextBlur.bind( this ) }
        onChange={ this.onTextChange.bind( this ) }
      />
    )
  }

  onTextChange( event ) {
    this.onUserInput( this.inputText.value )
  }

  onTextFocus( event ) {
    this.inputText.select()
    this.state.selected = true
  }

  onTextBlur( event ) {
    this.state.selected = false
    this.onUserInput( this.inputText.value )
  }

  onValueSelf( value ) {
    if ( !this.state.selected && this.inputText )
      this.inputText.value = String( value )
  }
}

module.exports = Text
