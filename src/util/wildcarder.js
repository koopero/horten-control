const wildcarder = exports
import _ from 'lodash'
const isMatch = require('minimatch')

wildcarder.isMatch = function( subject, wildcard ) {
  if ( _.isUndefined( wildcard ) ) 
    return true 

  if ( _.isArrayLikeObject( wildcard ) ) {
    for ( let i = 0; i < wildcard.length; i ++ ) 
      if ( wildcarder.isMatch( subject, wildcard[i] ) )
        return true 

    return false
  }

  if ( _.isString( subject ) ) {
    if ( _.isString( wildcard ) ) {
      return isMatch( subject, wildcard )
    }
  }

  return false
}

wildcarder.filter = function( subjects, wildcard ) {
  return _.filter( subjects, ( subject ) => wildcarder.isMatch( subject, wildcard ) )
}
