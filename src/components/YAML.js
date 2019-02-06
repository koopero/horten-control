import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierLakesideDark, atelierLakesideLight } from 'react-syntax-highlighter/dist/styles/hljs'

import jsYaml from 'js-yaml'
const safeDump = ( v ) => 'undefined' == typeof v ? '# undefined' : jsYaml.safeDump( v )
const YAML = ( props ) => {
  return (
    <SyntaxHighlighter className="yaml" language={'yaml'} style={ props.highkey ? atelierLakesideLight : atelierLakesideDark }>{ safeDump ( props.data ) }</SyntaxHighlighter>
  )
}

export default YAML
