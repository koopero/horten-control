const React = require('react')

const H = require('horten')

class Path extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {}
    this.state.path = props.path
  }
  render () {
    var path = this.state.path
      , array = H.path.split( path )
      , string = H.path.string( path )
      , segs = array.map( segment )

    return (
      <a className='path' id={string}>
        { segs }
      </a>
    )

    function segment( seg, id, arr ) {
      var classes = []

      if ( id == 0 )
        classes.push('first')

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

module.exports = Path
