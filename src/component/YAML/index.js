'use strict'

import Textarea from 'react-textarea-autosize'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { ocean } from 'react-syntax-highlighter/styles/hljs'

const React = require('react')
    , Base = require('../Base')
    , jsYaml = require('js-yaml')
    , safeDump = ( v ) => 'undefined' == typeof v ? '# undefined' : jsYaml.safeDump( v )

require('./index.less')

class YAML extends Base {
  constructor( props ) {
    super( props )
    this.state.cursor.delay = 50
    this.state.type = 'text'
    this.state = this.state || {}
    this.state.value = this.state.cursor.value
  }

  renderSelf() {
    let size = parseInt( this.props.size ) || 24

    return (
      <span className='horten'>
        <SyntaxHighlighter language={"yaml"} style={ ocean }>{ safeDump ( this.state.value ) }</SyntaxHighlighter>
      </span>
    )
  }

  onValueSelf( value ) {
    if ( !this.state.selected )
      this.setState( Object.assign( {}, this.state, { value: value } ) )
  }
}

module.exports = YAML
