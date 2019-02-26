import Control from './Control'
import H from 'horten'

export default class ControlHasSource extends Control {
  propsToState( props ) {
    let state = super.propsToState( props )

    state.source = new H.Cursor()
    state.source.delay = 0
    state.source.echo = false
    state.source.path = props.source
    state.source.on('delta', this.onSourceDelta.bind( this ) )
    state.source.on('keys', this.onSourceKeys.bind( this ) )


    return state
  }

  onSourceDelta( delta ) {

  }

  onSourceKeys( keys ) {

  }


  componentDidMount() {
    super.componentDidMount()
    if ( this.state.source && this.state.source.path.length ) 
      this.state.source.listening = true 
    
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.state.cursor.listening = false
    this.state.source.listening = false
  }
}