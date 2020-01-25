import React from 'react'
import equal from 'deep-equal'
import Base from '../../base/ControlHasSource'
import Trigger from '../../components/Trigger'
import H from 'horten'

import _ from 'lodash'
const wildcarder = require('../../util/wildcarder')

export default class Options extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'options'
  }

  setOptions( options ) {
    const state = this.state = this.state || {}
    const { props } = this
    options = options || this.props.options
    
    let items = []

    if ( _.isArrayLikeObject( options ) ) {
      options.map( ( a ) => option( a )  )
    } else if ( _.isObject( options ) ) {
      _.map( options, option )
    }

    if ( state.source && state.source.path.length ) {
      var sourceKeys = state.source.mutant.keys()
      sourceKeys = wildcarder.filter( sourceKeys, props.wildcard )

      switch( props.sourceMode ) {
        case 'value':
          sourceKeys.forEach( ( key ) => option( { title: key, value: state.source.mutant.get( key ) } ) )
        break

        default:
        case 'key':
          sourceKeys.forEach( ( key ) => option( key ) )
        break
      }

    }

    items = _.sortBy( items, 'order' )

    return this.setState( { items } )

    function option( item ) {

      if ( !_.isObject( item ) ) 
        item = { value: item }
      else 
        item = _.clone( item )

      if ( !item.title )
        item.title = String( item.value )

      // title = title || value
      // title = String( title )

      // let item = { value, title, colour, icon, order }
      items.push( item )
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
      <div className='options'>{ state.items.map( Option ) }</div>
    )

    function Option( item, index ) {
      let { value, title, colour, icon } = item
      var classes = []

      if ( index == 0 )
        classes.push('first')

      classes = classes.join(' ')+' '

      return (
        <Trigger
          className={ classes }
          path={ self.state.path }
          key={index}
          hide="all"
          show="control"
          title={ title }
          trigger={ value }
          colour={ colour }
          icon={ icon }
        />)
    }
  }
}

