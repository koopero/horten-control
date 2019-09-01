import React from 'react'
import Colour from 'deepcolour'

// Aped from CSS
let _border = 1

require('../style/sliders.less')


export default class VBoxSlider extends React.Component {
  constructor( props ) {
    super( props )
    this.ref = this.ref || {}
    this.state = this.state || {}
    this.state.value = parseFloat( props.value ) || 0
    this.state.mouseActive = false
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
      // backgroundSize: '200% 200%',
      backgroundRepeat: 'none',
      position: 'relative',
    }
    const onMouse = this.onMouse.bind( this )
    const onTouch = this.onTouch.bind( this )

    return (
      <div
        className={'slider vertical area'}
        onMouseMove={ onMouse }
        onMouseDown={ onMouse }
        onMouseLeave={ onMouse }
        onTouchMove={ onTouch }
        onTouchStart={ onTouch }
        style={style}
        ref={(div) => this.ref.main = div }
      >
        <div
          className='thumb vertical'
          ref={(div) => this.ref.thumb = div }
          style={{
            position: 'absolute'
          }}
        ><div className='nail highlight'/></div>
      </div>
    )
  }

  renderGradient() {
    if ( !this.props.colour )
      return ''

    const steps = 13

    let colour = new Colour( this.props.colour )
    // colour.hue = this.props.colour.hue
    let channel = this.props.colourChannel
    let result = []

    for ( let i = 0; i < steps; i ++ ) {
      let y = i / ( steps-1)
      colour.setChannel( channel, y )
      let r = colour.toHexString()
      if ( y != 0 && y != 1 )
        r += ' '+Math.round(y*100)+'%'

      result.push( r )
    }

    result = result.join(', ')
    result = `linear-gradient( 0, ${result} )`

    return result
  }

  onMouse( event ) {
    if ( event.type == 'mousedown' )
      this.state.mouseActive = true
    else if ( !event.buttons )
      this.state.mouseActive = false

    if ( !this.state.mouseActive )
      return

    this.onMouseMove( event )
    event.preventDefault()

  }

  onTouch( event ) {
    let touches = event.touches

    if ( touches.length )
      this.onMouseMove( touches[0] )
    event.preventDefault()
  }

  onMouseMove( event ) {
    let bounds = this.ref.main.getBoundingClientRect()

    let thumbH = this.ref.thumb.clientHeight + _border
    let ourH = this.ref.main.clientHeight
    let y = event.clientY - bounds.top
    let v = ( y - thumbH / 2 ) / ( ourH - thumbH )

    v = v > 1 ? 1 : v < 0 ? 0 : v
    v = 1 - v

    this.setValue( v )


    if ( this.props.onUserInput ) {
      this.props.onUserInput( v )
    }
  }

  setValue( v ) {
    let thumbH = this.ref.thumb.clientHeight + _border
    let ourH = this.ref.main.clientHeight
    let y = (1-v) * ( ourH - thumbH )
    this.ref.thumb.style.top = y+'px'

    if ( this.props.colour ) y= 0
    // console.log( this.ref )
    this.ref.main.style.backgroundPosition = `0px ${y}px`
  }

}

