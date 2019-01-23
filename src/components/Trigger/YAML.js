const React = require('react')

const yaml = require('js-yaml')
module.exports = ( props ) => {
  return (
    <pre>{ 'undefined' == typeof props.data ? 'undefined' : yaml.dump( props.data ) }</pre>
  )
}
