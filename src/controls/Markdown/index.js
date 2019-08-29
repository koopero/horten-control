import Base from '../../base/Control'
import React from 'react'

import Markdown from 'react-markdown'
import { safeLoad } from 'js-yaml'
import SyntaxHighlighter from '../../components/SyntaxHighlighter'

import { ocean } from 'react-syntax-highlighter/dist/styles/hljs'
import Control from '../Control'

const mdutil = require('./util')

require('./index.less')


const CodeBlock = function ( props ) {
  const source = props.value || ''
  const language = props.language


  const meta = ( this && this.props && this.props.meta ) || {}

  switch( language ) {
  case 'control':
    var config = safeLoad( source )
    config.meta = H.util.compose( meta, config.meta )
    // var Control = require('../Control').default
    return (
      <Control {...config} />
    )
    break

  default:
    return (
      // <div className='md-element'>
        <span className='horten control source'>
          <SyntaxHighlighter language={language} style={ ocean }>{ source }</SyntaxHighlighter>
        </span>
      // </div>
    )
  }
}

const Heading = function( props ) {
  const state = this.state
  let text = props.children[0] || ''
  let hash = state.idPrefix + mdutil.hashTitle( text )
  hash = mdutil.unique( state.headingHashs, hash )
  let H = 'h'+props.level
  
  return (<H className="md-element" id={hash}>{ props.children }</H>)
  return <pre>{ JSON.stringify( props, null, 2 ) }</pre>
}

export default class OurMarkdown extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'markdown'
    this.state.markdown = this.props.markdown
    this.state.idPrefix = this.props.idPrefix || ''
    this.state.renderers = Object.assign(
      {},
      Markdown.renderers,
      {
        code: CodeBlock.bind( this ),
        heading: Heading.bind( this )
      }
    )

    // console.log( '**********', Markdown.renderers )
  }



  componentWillReceiveProps( props ) {
    this.setState( {
      type: 'markdown',
      markdown: props.markdown
    } )
  }

  renderSelf() {
    this.state.headingHashs = {}
    return (
      <Markdown
        className='markdown-content'
        source={ this.state.markdown }
        renderers={ this.state.renderers }
      />
    )
  }
}
