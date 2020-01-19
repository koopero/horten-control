import VBoxSlider from './VBoxSlider'

let _border = 1

export default class BoxSlider extends VBoxSlider {
  constructor( props ) {
    super( props )
    this.ref = this.ref || {}
    this.state = this.state || {}
    this.state.value = this.toArray( props.value ) || 0
    this.state.mouseActive = false
  }

  toArray( v ) {
    if ( !Array.isArray( v ) )
      v = [ v, v ]

    for ( let x = 0; x < 2; x ++ ) {
      v[x] = parseFloat( v[x] )
    }

    return v
  }

  getOrientation() {
    return {
      orientation: 'rect',

    }
  }

  onMouseMove( event ) {
    const { ref } = this
    let bounds = this.ref.main.getBoundingClientRect()

    let size = [ ref.main.clientWidth, ref.main.clientHeight ]
    let thumb = [ ref.thumb.clientWidth, ref.thumb.clientHeight ]
    let pos = [ event.clientX - bounds.left, event.clientY - bounds.top ]
    let vec = []
    for ( let axis = 0; axis < 2; axis ++ ) {
      let v = ( pos[axis] - thumb[axis] / 2 ) / ( size[axis] - thumb[axis] )
      v = v > 1 ? 1 : v < 0 ? 0 : v
      vec[axis] = v
    }

    this.setValue( vec )

    if ( this.props.onUserInput ) {
      this.props.onUserInput( vec )
    }
  }

  setValue(  v ) {
    const { ref } = this

    let size = [ ref.main.clientWidth, ref.main.clientHeight ]
    let thumb = [ ref.thumb.clientWidth, ref.thumb.clientHeight ]

    let x = v[0] * ( size[0] - thumb[0] )
    let y = v[1] * ( size[1] - thumb[1] )

    // if ( isNaN(x) || isNaN(y) )
    //   thumb.dis

    this.ref.thumb.style.left = x+'px'
    this.ref.thumb.style.top = y+'px'

    if ( this.props.colour ) y= 0
    // console.log( this.ref )

    let pos = [0,0]

    this.ref.main.style.backgroundPosition = `${pos[0]}px ${pos[1]}px`
  }

}

