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
//
//
//
//
//
// import { PropTypes } from 'react'
// import * as pathlib from '../path'
// import { connect } from 'react-redux'
//
//
//
//
// const _ = require('lodash')
//
// import { Slider } from './Slider'
//
// export const CodeBlock = function ( props ) {
//   const source = props.literal
//       , controlParams = safeLoad( source )
//
//   return (
//     <Slider {...controlParams }/>
//   )
// }
//
// const renderers = _.merge(
//   Markdown.renderers,
//   {
//     CodeBlock
//   }
// )
//
//
// const mapStateToProps = (state, ownProps) => {
//   return {
//     markdown: state.panel || ''
//   }
// }
//
//
// export const Panel = connect(
//   mapStateToProps
// )(
//   function ({ markdown }) {
//     return (
//       <section id="panel/">
//       <Markdown
//         className='panel'
//         source={ markdown }
//         renderers={ renderers }
//       />
//       </section>
//     )
//   }
// )
