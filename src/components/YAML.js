const React = require('react')
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierLakesideDark, atelierLakesideLight } from 'react-syntax-highlighter/styles/hljs'

const jsYaml = require('js-yaml')
const safeDump = ( v ) => 'undefined' == typeof v ? '# undefined' : jsYaml.safeDump( v )
module.exports = ( props ) => {
  return (
    <SyntaxHighlighter className="yaml" language={"yaml"} style={ props.highkey ? atelierLakesideLight : atelierLakesideDark }>{ safeDump ( props.data ) }</SyntaxHighlighter>
  )
}
