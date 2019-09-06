import React from 'react'
import equal from 'deep-equal'
import Base from '../../base/ControlHasSource'
import Trigger from '../../components/Trigger'
import H from 'horten'

const _ = require('lodash')
const wildcarder = require('../../util/wildcarder')

export default class Options extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'options'
  }

  setOptions( options ) {
    var state = this.state = this.state || {}
    options = options || this.props.options
    
    let values = []
    let titles = []

    if ( Array.isArray( options ) ) {
      options.map( ( a ) => option( a )  )
    } else if ( _.isObject( options ) ) {
      _.map( options, option )
    }

    if ( state.source && state.source.path.length ) {
      var sourceKeys = state.source.mutant.keys()
      sourceKeys = wildcarder.filter( sourceKeys, this.props.wildcard )
      sourceKeys.forEach( ( key ) => option( key ) )
    }


    return this.setState( { values, titles } )

    function option( value, title ) {
      title = title || value
      title = String( title )
      let titleInd = titles.indexOf( title )

      if ( titleInd == -1 ) {
        values.push( value )
        titles.push( title )
      }
    }
  }

  componentWillMount() {
    this.setOptions()
  }


  onSourceKeys( keys ) {
    this.setOptions()
  }

  renderSelf() {
    const self = this
    var state = this.state

    var options = this.props.options

    return (
      <div className='options'>{ state.titles.map( Option ) }</div>
    )

    function Option( title, index ) {
      var value = state.values[index]
      var title
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

