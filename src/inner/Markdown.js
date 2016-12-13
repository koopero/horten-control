const _ = require('lodash')

const React = require('react')

import Markdown from 'react-markdown'
import { safeLoad } from 'js-yaml'


export const CodeBlock = function ( props ) {
  const source = props.literal
      , language = props.language


  switch( language ) {
    case 'control':
      var config = safeLoad( source )
      const Control = require('../LoopinControl')
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

const renderers = _.merge(
  Markdown.renderers,
  {
    CodeBlock
  }
)

class OurMarkdown extends React.Component {
  render() {
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
