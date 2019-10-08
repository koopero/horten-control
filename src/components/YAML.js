import React from 'react'
import jsYaml from 'js-yaml'
const dump = ( v ) => 'undefined' == typeof v ? '# undefined' : 
  'string' == typeof v ? v : jsYaml.dump( v )
const YAML = ( props ) => {
  return (
    <pre className="yaml">{ dump ( props.data ) }</pre>
  )
}

export default YAML
