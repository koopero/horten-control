'use strict'

const Base = require('../Base')
    , React = require('react')

import Markdown from 'react-markdown'
import { safeLoad } from 'js-yaml'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { ocean } from 'react-syntax-highlighter/styles/hljs'

require('./index.less')


export var CodeBlock = function ( props ) {
  const source = props.value || ''
      , language = props.language
      , meta = ( this && this.props && this.props.meta ) || {}

  console.log('CodeBlock', props )

  switch( language ) {
    case 'control':
      var config = safeLoad( source )
      config.meta = H.util.compose( meta, config.meta )
      var Control = require('../Control')
      return (
        <Control {...config} />
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

class OurMarkdown extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'markdown'
    this.state.markdown = this.props.markdown
    this.state.renderers = Object.assign(
      {},
      Markdown.renderers,
      {
        code: CodeBlock.bind( this )
      }
    )
  }



  componentWillReceiveProps( props ) {
    this.setState( {
      type: 'markdown',
      markdown: props.markdown
    } )
  }

  renderSelf() {
    console.log('renderSelf', this.props )

    return (
      <Markdown
        className='inner'
        source={ this.state.markdown }
        renderers={ this.state.renderers }
      />
    )
  }
}

module.exports = OurMarkdown
