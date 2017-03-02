'use strict'

const Base = require('./Base')
    , React = require('react')

import Markdown from 'react-markdown'
import { safeLoad } from 'js-yaml'
import Highlight from 'react-hljs'

export var CodeBlock = function ( props ) {
  const source = props.literal
      , language = props.language


  switch( language ) {
    case 'control':
      var config = safeLoad( source )
      var Control = require('../HortenControl')
      return (
        <Control {...config}/>
      )
    break
    default:
      return (
        <span className='horten control source'>
          <Highlight className={language}>{ source }</Highlight>
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
  }
  renderSelf() {
    return (
      <Markdown
        className='inner'
        source={ this.props.markdown }
        renderers={ renderers }
      />
    )
  }
}

module.exports = OurMarkdown
