const util = module.exports

import _ from 'lodash'
import urllib from 'url'

export function unique( state, text ) {
  let index = 0
  let result = text
  while( result in state ) {
    index ++ 
    result = text + '-' + index
  }

  state[result] = true
  return result
} 

export function hashTitle( text ) {
  return String( text || '' )
    .toLowerCase()
    .trim()
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
    .replace(/\s/g, '-' )
} 

export function makeIndex ( {
  markdown, idPrefix = '', path
} ) {
  let index = []
  path = path || []
  if ( _.isString( path ) ) 
    path = path.split('/')

  let level = path.length
  let order = 0
  let uniq = unique.bind( null, {} ) 

  markdown.split(/[\r\n]+/).map( line => line.replace( /^(\#+)\s*(.*)/g, ( match, tag, text ) => {
    let tagLevel = tag.length + level
    let hash = uniq( idPrefix + hashTitle( text ) )
    path = path.slice( 0, tagLevel )
    path[tagLevel-1] = hash
    index.push( {
      link: '#'+hash,
      path: path.slice(),
      level: tagLevel,
      text,
      order
    })

    order ++
  }))

  return index
}