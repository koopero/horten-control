const React = require('react')

const H = require('horten')

class Options extends React.Component {
  constructor( props ) {
    super( props )
    this.parseOptions()
  }

  componentWillReceiveProps(nextProps) {

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

  render() {
    const state = this.state

    var options = this.props.options

    return (
      <span className="options">{ this.state.titles.map( Option ) }</span>
    )

    function Option( title, index ) {
      var value = state.values[index], title
      var classes = []

      if ( index == 0 )
        classes.push('first')

      classes = classes.join(' ')

      return <button key={index}>{ title }</button>
    }
  }
}

module.exports = Options
