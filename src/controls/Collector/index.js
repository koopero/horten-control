import React from 'react'
import Base from '../Base'
import YAML from '../../components/YAML'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPause, faTrash, faPlay, faCopy } from '@fortawesome/free-solid-svg-icons'

require('./index.less')

const H = require('horten')
const _ = require('lodash')

const MODES = {
  'record': { icon: faCircle },
  'pause': { icon: faPause },
}

const TOOLS = {
  'trash': { icon: faTrash },
  'save': { icon: faPlay },
  'copy': { icon: faCopy },
}

export default class Collector extends Base {
  renderTools() {
    const { state } = this

    let modes = _.map( MODES, ( spec, mode ) => {
      let selected = mode == state.mode
      let className = 'button icon'
      className += selected ? ' selected' : ' unselected'

      return <span
        onClick={ event => this.onCollectorModeClick( mode ) }
        className={ className }
      >
        <FontAwesomeIcon icon={spec.icon} />
      </span>
    })

    let tools = _.map( TOOLS, ( spec, tool ) => {
      let selected = tool == state.tool
      let className = 'button icon tool'

      return <span
        onClick={ event => this.onCollectorToolClick( tool ) }
        className={ className }
      >
        <FontAwesomeIcon icon={spec.icon} />
      </span>
    })

    // return <div className="tools toolbar">{ tools }</div>

    return [ super.renderTools(), modes, tools ]
  }

  onCollectorModeClick( mode ) {
    this.setState( { mode } )
  }

  onCollectorToolClick( tool ) {
    switch( tool ) {
      case 'trash':
        return this.setState( { value: null } )

      case 'pause':
        return this.setState( { tool: 'pause' } )
    }
  }

  renderSelf() {
    let size = parseInt( this.props.size ) || 24

    return (
      <span className='horten display'>
        <YAML data={ this.state.value }/>
      </span>
    )
  }

  onValueSelf( value ) {
    // if ( !this.state.selected )
    //   this.setState( Object.assign( {}, this.state, { value: value } ) )
  }

  onSourceDelta( value, path ) {
    if ( this.state.mode == 'record' )
      this.setState( { value: _.merge( this.state.value, value ) })
  }


  //
  // Move to HasSource
  //

  propsToState( props ) {
    let state = super.propsToState( props )

    state.mode = props.mode || state.mode || 'record'

    state.source = new H.Cursor()
    state.source.delay = 0
    state.source.echo = false
    state.source.path = props.source
    state.source.on('delta', this.onSourceDelta.bind( this ) )

    return state
  }


  componentDidMount() {
    super.componentDidMount()
    if ( this.state.source ) 
      this.state.source.listening = true 
    
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.state.cursor.listening = false
    this.state.source.listening = false
  }
}
