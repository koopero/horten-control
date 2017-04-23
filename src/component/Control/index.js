'use strict'
module.exports = HortenControl

const _ = require('lodash')
    , React = require('react')

function HortenControl( props ) {

  const meta = _.merge( {}, require('../meta.js'), props.meta )

  var type = props.type
  if ( !type && meta.propToType )
    for ( var key in meta.propToType )
      if ( typeof props[ key ] != 'undefined' ) {
        type = meta.propToType[ key ]
        break
      }

  type = type || 'group'

  if ( !meta.type[ type ] )
    return (
      <div className="horten error">Type { type } not found.</div>
    )

  const Type = meta.type[ type ]

  return (
    <Type
      {...props}
    />
  )
}
