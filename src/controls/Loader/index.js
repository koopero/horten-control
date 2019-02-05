const request = require('browser-request')
    , React = require('react')
    , yaml = require('js-yaml')

const Control = require('../Control')

class Loader extends React.Component {
  constructor(props) {
    super( props )
    this.state = {
      url: props.src,
      loading: true
    }
  }

  componentWillReceiveProps( props ) {
    this.setState( {
      url: props.src,
      loading: true
    })
    this.load( props.src )
  }

  componentDidMount() {
    if ( this.state.url )
      this.load()
  }

  load( url ) {
    const self = this
    url = url || this.state.url
    request( {
      url: url
    }, function ( err, response, body ) {
      try {
        var data = yaml.safeLoad( body )

        // Avoid strings being interpreted as YAML
        if ( 'object' != typeof data )
          data = null
      } catch ( e ) {
        // console.error('Yaml error', e )
        // Nope, wasn't yaml.
      }

      if ( data ) {
        self.setState( { control: data, error: null } )
      } else if ( body ) {
        self.setState( { control: { markdown: body }, error: null } )
      } else {
        self.setState( {
          error: `Problem loading ${url}. Could be empty.`
        })
      }

    })
  }

  render() {
    const control = this.state.control

    return <span>Loader</span>
    if ( this.state.error ) {
      return (
        <b>{ this.state.error}</b>
      )
    } else if ( Array.isArray( control ) ) {
      return (
        <Control subs={control} meta={ this.props.meta }/>
      )
    } else if ( control ) {
      return (
        <Control {...control} meta={ this.props.meta }/>
      )
    } else {
      return (
        <div className='loader'/>
      )
    }
  }
}

module.exports = Loader
