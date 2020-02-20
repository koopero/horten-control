import React from 'react'
import Colour from 'deepcolour'

// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

function preventDefault( e ) {
  e.preventDefault()
}

function disableBodyScroll() {
  document.addEventListener('touchmove', preventDefault, { passive: false } )
}

function enableBodyScroll() {
  document.removeEventListener('touchmove', preventDefault, { passive: false } )
}


// Aped from CSS
let _border = 1

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
    const gradStyle = {
      backgroundImage: this.renderGradient(),
      // backgroundSize: '200% 200%',
      backgroundRepeat: 'none',
      position: 'relative',
    }
    const onMouse = this.onMouse.bind( this )
    const onTouch = this.onTouch.bind( this )

    let { direction, orientation } = this.getOrientation()

    direction = direction && `direction-${direction}` || ''

    let label = this.props.label || ''

    return (
      <div
        className={`slider ${orientation} area ${direction}`}
        onMouseMove={ onMouse }
        onMouseDown={ onMouse }
        onMouseLeave={ onMouse }
        onTouchMove={ onTouch }
        onTouchStart={ onTouch }
        onTouchEnd={ onTouch }
        // onTouchCancel={ onTouch }

        ref={(div) => this.ref.main = div }
      >
        <div
          className={`gradient ${orientation}`}
          ref={(div) => this.ref.gradient = div }
          style={gradStyle}
        />
        <div
          className={`thumb ${orientation}`}
          ref={(div) => this.ref.thumb = div }
          style={{
            position: 'absolute'
          }}
        >
          <div className='nail highlight label'>{ label }</div>
        </div>
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

    // console.log('onMouse', event )
  

    this.onMouseMove( event )
    event.preventDefault()
    event.stopPropagation()
  }

  onTouch( event ) {
    let touches = event.touches

    if ( touches.length )
      this.onMouseMove( touches[0] )

    // console.log('onTouch', event.type )

    switch( event.type ) {
      case 'touchstart':
      case 'touchmove':
        disableBodyScroll( this.ref.main )
      break
      
      case 'touchend':
        enableBodyScroll( this.ref.main )
      break
    }

    event.preventDefault()
    event.stopPropagation()
  }

  getOrientation() {
    let orientation 
    let direction
    let reverse

    switch ( this.props.direction ) {
      case 'down':
        orientation = 'vertical'
        direction = 'down'
        reverse = false
      break

      case 'left':
        orientation = 'horizontal'
        direction = 'left'     
        reverse = true
      break

      case 'right':
        orientation = 'horizontal'
        direction = 'right'     
        reverse = false
      break

      default:
      case 'up':
        orientation = 'vertical'
        direction = 'up'
        reverse = true
      break
    }

    var sizeKey, posKey, topKey, dirKey 

    switch ( orientation ) {
      case 'horizontal':
        sizeKey = 'clientWidth'
        posKey = 'clientX'
        topKey = 'left'
        dirKey = 0
      break
      case 'vertical':
        sizeKey = 'clientHeight'
        posKey = 'clientY'
        topKey = 'top'
        dirKey = 1
      break
    }

    return { direction, orientation, reverse, sizeKey, posKey, topKey, dirKey }
  }

  onMouseMove( event ) {
    let bounds = this.ref.main.getBoundingClientRect()


    const { direction, orientation, reverse, sizeKey, posKey, topKey } = this.getOrientation()
    let thumbH = this.ref.thumb[sizeKey]
    let ourH = this.ref.main[sizeKey]
    let y = event[posKey] - bounds[topKey]
    let v = ( y - thumbH / 2 ) / ( ourH - thumbH )

    v = v > 1 ? 1 : v < 0 ? 0 : v

    if ( reverse )
      v = 1 - v

    this.setValue( v )

    if ( this.props.onUserInput ) {
      this.props.onUserInput( v )
    }
  }

  setValue( v ) {
    const { dirKey, reverse, sizeKey, posKey, topKey } = this.getOrientation()

    let thumbH = this.ref.thumb[sizeKey]
    let ourH = this.ref.main[sizeKey]

    if ( reverse )
      v = 1 - v  

    v = v > 1 ? 1 : v < 0 ? 0 : v 

    let y = v * ( ourH - thumbH )
    this.ref.thumb.style[topKey] = y+'px'

    if ( this.props.colour ) y = 0
    // console.log( this.ref )

    let pos = [0,0]
    pos[dirKey] = y + thumbH / 2

    this.ref.main.style.backgroundPosition = `${pos[0]}px ${pos[1]}px`
  }

}

