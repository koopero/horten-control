'use strict'


const React = require('react')
    , Base = require('../Base')
    , YAML = require('../../components/YAML')

require('./index.less')

class Display extends Base {
  constructor( props ) {
    super( props )
    this.state.cursor.delay = 50
    this.state.type = 'yaml'
    this.state = this.state || {}
    this.state.value = this.state.cursor.value
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
    if ( !this.state.selected )
      this.setState( Object.assign( {}, this.state, { value: value } ) )
  }
}

module.exports = Display
