const React = require('react')

const string2png = require('string2png')
const Colour = require('deepcolour')

// Aped from CSS
let _border = 6


class VBoxSlider extends React.Component {
  constructor( props ) {
    super( props )
    this.ref = this.ref || {}
    this.state = this.state || {}
    this.state.value = parseFloat( props.value ) || 0
  }



  componentDidMount() {
    this.setValue( this.state.value )
  }

  componentDidUpdate() {
    this.setValue( this.state.value )
  }

  componentWillReceiveProps(props) {
    let value = parseFloat( props.value )
    if ( !isNaN(value))
      this.state.value = value
  }


  render() {
    const style = {
          backgroundImage: this.renderGradient(),
          position: 'relative'
        }
        , onMouse = this.onMouse.bind( this )



    return (
      <div
        className={'vboxslider'}
        onMouseMove={ onMouse }
        onMouseDown={ onMouse }
        onMouseLeave={ onMouse }
        style={style}
        ref={(div) => this.ref.main = div }
      >
        <div
          className='thumb'
          ref={(div) => this.ref.thumb = div }
          style={{
            position: 'absolute'
          }}
        />
      </div>
    )
  }

  renderGradient() {
    const steps = 13

    let colour = new Colour( this.props.colour )
    colour.hue = this.props.colour.hue
    let channel = this.props.colourChannel
    let pixels = ''

    for ( let i = 0; i < steps; i ++ ) {
      let y = 1-i / ( steps-1)
      colour[channel] = y
      pixels += colour.hex
    }

    return string2png.css(pixels, {width:1})
  }


  onMouse( event ) {
    if ( !event.buttons )
      return

    let thumbH = this.ref.thumb.clientHeight + _border
      , ourH = this.ref.main.clientHeight
      , y = event.pageY - this.ref.main.offsetTop
      , v = ( y - thumbH / 2 ) / ( ourH - thumbH )

    v = v > 1 ? 1 : v < 0 ? 0 : v
    v = 1 - v

    this.setValue( v )
    event.preventDefault()

    if ( this.props.onUserInput )
      this.props.onUserInput( v )
  }

  setValue( v ) {
    let thumbH = this.ref.thumb.clientHeight + _border
      , ourH = this.ref.main.clientHeight
      , y = (1-v) * ( ourH - thumbH )

    this.ref.thumb.style.top = y+'px'
  }

}

module.exports = VBoxSlider
