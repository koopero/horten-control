'use strict'
module.exports = HortenControl

var _ = require('lodash')
    , React = require('react')

const PROP_TO_TYPE = {
  src: 'loader',
  float: 'float',
  options: 'options',
  markdown: 'markdown',
  yaml: 'yaml',
  trigger: 'trigger'
}

const TYPES = require('./control/index')


function HortenControl( props ) {

  var type = props.type

  if ( !type )
    for ( var key in PROP_TO_TYPE )
      if ( typeof props[ key ] != 'undefined' ) {
        type = PROP_TO_TYPE[ key ]
        break
      }

  type = type || 'group'

  if ( !TYPES[ type ] )
    return (
      <div className="horten error">Type { type } not found.</div>
    )

  const Type = TYPES[ type ]

  return (
    <Type
      {...props}
    />
  )
}
