'use strict'
module.exports = HortenControl
require('./index.less')


const _ = require('lodash')
    , React = require('react')
    , H = require('horten')


function HortenControl( props ) {
  props = _.clone( props )
  const meta = new H.Mutant( props.meta )

  var type = props.type

  let propToType = meta.get('propToType')
  if ( !type && propToType )
    for ( var key in propToType )
      if ( key in props ) {
        type = propToType[ key ]
        break
      }

  type = type || 'group'


  props.type = type
  do {
    var lastType = props.type
    let metaType = meta.get('type', props.type )
    _.defaults( props, metaType )
    _.merge( props, _.pick( metaType, ['type'] ) )

  } while( props.type != lastType )

  props.meta = meta.get()

  let _class = props._class

  if ( !_class ) {
    return (
      <div className="horten error">No class found for type { type }!</div>
    )
  }

  return (
    <_class
      {...props}
    />
  )
}