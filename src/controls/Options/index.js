import React from 'react'
import equal from 'deep-equal'
import Base from '../Base'
import Trigger from '../../components/Trigger'
import H from 'horten'

export default class Options extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'options'
    this.parseOptions()
  }

  parseOptions( options ) {
    var state = this.state = this.state || {}
    options = options || this.props.options
    state.values = []
    state.titles = []

    if ( 'string' == typeof options ) {
    }

    if ( !options ) {
      option( false, 'false')
      option( true, 'true')
    } else if ( Array.isArray( options ) ) {
      options.map( ( a ) => option( a )  )
    }


    function option( value, title ) {
      title = title || value
      title = String( title )
      state.values.push( value )
      state.titles.push( title )
    }
  }

  renderSelf() {
    const self = this
    var state = this.state

    var options = this.props.options

    return (
      <div className='options'>{ this.state.titles.map( Option ) }</div>
    )

    function Option( title, index ) {
      var value = state.values[index], title
      var classes = []

      if ( index == 0 )
        classes.push('first')

      classes = classes.join(' ')

      return (
        <Trigger
          className={ classes }
          path={ self.state.path }
          key={index}
          hide="all"
          show="control"
          title={ title }
          trigger={ value }
        />)
    }
  }
}

