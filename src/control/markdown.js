'use strict'

const Base = require('./base')
    , React = require('react')

import Markdown from 'react-markdown'
import { safeLoad } from 'js-yaml'


export var CodeBlock = function ( props ) {
  var source = props.literal
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
        <pre>{ source }</pre>
      )
  }
  console.log( 'CodeBlock', props )

  return (
    <h2>This is a source block</h2>
  )
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
        className='panel'
        source={ this.props.markdown }
        renderers={ renderers }
      />
    )
  }
}

module.exports = OurMarkdown
