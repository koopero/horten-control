'use strict'

const Base = require('../Base')
    , React = require('react')

import Markdown from 'react-markdown'
import { safeLoad } from 'js-yaml'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/dist/styles';

require('./index.less')

export var CodeBlock = function ( props ) {
  const source = props.literal
      , language = props.language


  switch( language ) {
    case 'control':
      var config = safeLoad( source )
      var Control = require('../Control')
      return (
        <Control {...config}/>
      )
    break
    default:
      return (
        <span className='horten control source'>
          <SyntaxHighlighter language={language} style={ ocean }>{ source }</SyntaxHighlighter>
        </span>
      )
  }
}

var renderers = Object.assign(
  {},
  Markdown.renderers,
  {
    CodeBlock
  }
)

class OurMarkdown extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'markdown'
    this.state.markdown = this.props.markdown
  }

  componentWillReceiveProps( props ) {
    this.setState( {
      type: 'markdown',
      markdown: props.markdown
    } )
  }

  renderSelf() {
    return (
      <Markdown
        className='inner'
        source={ this.state.markdown }
        renderers={ renderers }
      />
    )
  }
}

module.exports = OurMarkdown
