const React = require('react')

const floatToStr = require('../func/floatToStr')

const Ranger = require('../util/Ranger')

class Float extends React.Component {
  constructor( props ) {
    super( props )
    console.log('prop?', this.props )
    this.ranger = new Ranger( this.props )
    this.state = {}
  }

  render() {
    const min = 0
        , max = 4
        , value = 2

    return (
      <span className='loopin slider'>
        <span className='major'>
          { this.renderMarkers() }
          <input
            type="range"
            name="slider"
            step={Number.EPSILON}
            min={0} max={1}
            defaultValue={ 0 }
            ref={(input) => this.inputRange = input }
            onChange={ this.onInputChange.bind( this ) }
          />
        </span>

        <span className='minor'>
          <input
            className='mid'
            type="text"
            defaultValue={ floatToStr( value ) }
            ref={(node) => this.inputText = node }
            onFocus={ this.onTextFocus.bind( this ) }
            onBlur={ this.onTextBlur.bind( this ) }
            onChange={ this.onTextChange.bind( this ) }
          />

          <input
            className='mid'
            type="number"
            name="direct"
            defaultValue={ value }
            style={{ display:'none'}}
          />
        </span>

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
    const input = this.inputText
    input.type = 'number'
    input.value = this.state.value
    input.select()
    this.state.textSelected = true
  }

  onTextBlur( event ) {
    const input = this.inputText
    input.type = 'text'
    input.value = this.valueString()

    this.state.textSelected = false
  }

  renderMarkers() {
    const self = this
    const markers = this.props.markers

    return (
      <span className='markers'>
        { markers.map( renderMarker ) }
      </span>
    )

    function renderMarker( marker, index ) {
      var value = 0, text = '!?'

      if ( 'number' == typeof marker ) {
        value = marker
        text = value.toString()
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




  valueSet( value ) {
    console.log('onInputChange', this.inputRange.value )
    this.state.value = value

    this.inputRange.value = this.ranger.toUnit( value )
    if ( !this.state.textSelected )
      this.inputText.value = this.valueString()
  }

  valueString() {
    return floatToStr( this.state.value )
  }

}

Float.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  pow: React.PropTypes.number,

  markers: React.PropTypes.array,
}

Float.defaultProps = {
  min: 0,
  max: 1,
  pow: 1,
  markers: []
}

module.exports = Float
