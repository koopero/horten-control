'use strict'

var React = require('react')

var H = require('horten')

require('./index.less')

export default class Path extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {}
    this.state.path = props.path
  }
  render () {
    var path = this.state.path
      , array = H.path.split( path )
      , string = H.path.string( path )
      , prefix = H.path.split( this.props.pathPrefix )
      , segs = array.map( segment )
      , first = true

    return (
      <span className='path' id={string}>
        { segs }
      </span>
    )

    function segment( seg, id, arr ) {
      var classes = []

      if ( seg == prefix[id] ) {
        return
        classes.push('prefix')
      } else if ( first ) {
        classes.push('first')
        first = false
      }

      if ( id == arr.length -1  )
        classes.push('last key')
      else
        classes.push('ancestor')

      classes = classes.join(' ')

      return (
        [
          <span className={classes + ' seg'} key={id+'seg'}>{ seg }</span>,
          <span className={classes + ' delim'} key={id+'delim'}>/</span>
        ]
      )
    }
  }
}
