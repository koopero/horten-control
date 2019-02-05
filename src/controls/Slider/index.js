'use strict'

const React = require('react')
const _ = require('lodash')
const Base = require('../Base')

const floatToStr = require('../../util/floatToStr')

const Ranger = require('../../util/Ranger')

require('./index.less')

class Slider extends Base {
  constructor( props ) {
    super( props )
    this.ranger = new Ranger( this.props )
    this.state.type = 'slider'
    this.state = this.state || {}
    this.state.value = parseFloat( this.props.defaultValue ) || 0
  }

  renderSelf() {
    return (
      <div className='slider'>
        <span className='major'>
          <input
            type="range"
            name="slider"
            step={Number.EPSILON}
            min={0} max={1}
            defaultValue={ this.valueUnit() }
            ref={ (input) => this.inputRange = input }
            onChange={ this.onInputChange.bind( this ) }
          />
          { this.renderMarkers() }
        </span>
        <div className='clearfix'>{' '}</div>
      </div>
    )
  }

  renderShort() {
    return (
      <span className='short'>
        <input
          className='secondary'
          type="text"
          defaultValue={ this.valuePretty() }
          ref={(node) => this.inputText = node }
          onFocus={ this.onTextFocus.bind( this ) }
          onBlur={ this.onTextBlur.bind( this ) }
          onChange={ this.onTextChange.bind( this ) }
        />
      </span>
    )
  }

  onInputChange( event ) {
    this.valueSet( this.ranger.fromUnit( this.inputRange.value ) )
  }

  onTextChange( event ) {
    this.valueSet( parseFloat( this.inputText.value ) )
  }


  onTextFocus( event ) {
    if ( this.inputChangingType )
      return 
    var input = this.inputText
    this.inputChangingType = true
    input.type = 'number'
    input.value = this.state.value
    input.select()
    this.state.textSelected = true
    setTimeout( () => this.inputChangingType = false,100 )
  }

  onTextBlur( event ) {
    if ( this.inputChangingType )
      return 

    this.inputChangingType = true
    var input = this.inputText
    input.type = 'text'
    input.value = this.valuePretty()
    this.state.textSelected = false
    setTimeout( () => this.inputChangingType = false,100 )
  }

  renderMarkers() {
    var self = this
        , ranger = self.ranger

    var markers = this.props.markers || [ this.ranger.min, this.ranger.max ]

    return (
      <span className='markers-wrap'>
        <span className='markers'>
          { _.map( markers, renderMarker ) }
        </span>
      </span>
    )

    function renderMarker( marker, index ) {
      var value = 0, text = '!?'

      if ( 'number' == typeof marker ) {
        value = marker
        text = ranger.toPretty( marker, 0 )
      } else if ( 'string' == typeof marker ) {
        text = marker
        value = parseFloat( value )
      } else if ( 'object' == typeof marker && marker !== null ) {
        value = marker.value
        text = marker.text
      }

      return (
        <div
          key={ index }
          className='marker'
          style={{ transform: `translateX(${self.ranger.toPercent( value )})` }}
        ><div className='inner'>{ text }</div></div>
      )
    }
  }

  valueUnit() {
    return this.ranger.toUnit( this.state.value )
  }

  valuePretty() {
    return this.ranger.toPretty( this.state.value )
  }

  valueSet( value ) {
    var oldValue = this.state.value
    this.state.value = value

    this.inputRange.value = this.ranger.toUnit( value )
    if ( !this.state.textSelected ) {
      if ( this.inputText.type == 'number' )
      this.inputText.value = value
      else
        this.inputText.value = this.valuePretty()
    }

    this.onUserInput( this.state.value )
  }

  onValueSelf( value ) {
    this.state.value = value
    this.inputRange.value = this.ranger.toUnit( value )
    if ( !this.state.textSelected )
      this.inputText.value = this.ranger.toPretty( value )
  }
}

// Slider.propTypes = {
//   min: React.PropTypes.number,
//   max: React.PropTypes.number,
//   pow: React.PropTypes.number,
//   markers: React.PropTypes.array
// }

Slider.defaultProps = {
  min: 0,
  max: 1,
  pow: 1,
  markers: [],
  unit: ''
}

module.exports = Slider
