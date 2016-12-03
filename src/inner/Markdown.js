'use strict'

var _ = require('lodash')

var React = require('react')

import Markdown from 'react-markdown'
import { safeLoad } from 'js-yaml'


export var CodeBlock = function ( props ) {
  var source = props.literal
      , language = props.language


  switch( language ) {
    case 'control':
      var config = safeLoad( source )
      var Control = require('../LoopinControl')
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

var renderers = _.merge(
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
// var _ = require('lodash')
//
// import { Slider } from './Slider'
//
// export var CodeBlock = function ( props ) {
//   var source = props.literal
//       , controlParams = safeLoad( source )
//
//   return (
//     <Slider {...controlParams }/>
//   )
// }
//
// var renderers = _.merge(
//   Markdown.renderers,
//   {
//     CodeBlock
//   }
// )
//
//
// var mapStateToProps = (state, ownProps) => {
//   return {
//     markdown: state.panel || ''
//   }
// }
//
//
// export var Panel = connect(
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
