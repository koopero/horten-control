const React = require('react')
const H = require('horten')


export default class Path extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {}
    this.state.path = props.path
  }
  render () {
    let path = this.state.path
    let array = H.path.split( path )

    if ( !array.length ) {
      return null
    }


    let string = H.path.string( path )
    let prefix = H.path.split( this.props.pathPrefix )
    let segs = array.map( segment )
    let first = true

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
          <span className={classes + ' delim'} key={id+'delim'}>/</span>,
          <span className={classes + ' seg'} key={id+'seg'}>{ seg }</span>
        ]
      )
    }
  }
}
