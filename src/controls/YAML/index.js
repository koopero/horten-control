import React from 'react'
import Base from '../../base/Control'
import YAML from '../../components/YAML'

require('./index.less')

export default class Display extends Base {
  constructor( props ) {
    super( props )
    this.state.cursor.delay = 50
    this.state.type = 'yaml'
    this.state = this.state || {}
    this.state.value = this.state.cursor.value
  }

  renderSelf() {
    let size = parseInt( this.props.size ) || 24
    let value = this.props.display || this.state.value

    return (
      // <span className='horten display'>
        <YAML className='display' data={ value }/>
      // </span>
    )
  }

  onValueSelf( value ) {
    if ( !this.state.selected )
      this.setState( Object.assign( {}, this.state, { value: value } ) )
  }
}
