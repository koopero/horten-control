import React from 'react'
import jsYaml from 'js-yaml'
const safeDump = ( v ) => 'undefined' == typeof v ? '# undefined' : jsYaml.safeDump( v )
const YAML = ( props ) => {
  return (
    <pre className="yaml">{ safeDump ( props.data ) }</pre>
  )
}

export default YAML
