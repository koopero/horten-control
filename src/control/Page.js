'use strict'
module.exports = Page

const _ = require('lodash')
    , React = require('react')

const HortenControl = require('../HortenControl')


function Page( props ) {

  props = Object.assign( { content: {} }, props, global.__HortenPage )

  var content = props.content

  if ( !content.src && !content.type )
    content.src = 'index.md'

  return (
    <div
      className='horten page'
    >
      <aside className="primary">
        { renderNav() }
      </aside>
      <section><HortenControl {...content}/></section>
      <aside className="secondary">
        { renderNav() }
      </aside>
    </div>
  )

  function renderNav() {
    if ( props.nav )
      return (
        <nav>
          { _.map( props.nav, navItem ) }
        </nav>
      )

    function navItem( item, index ) {
      return (
        <button key={ index }>{ item.title }</button>
      )
    }
  }
}
