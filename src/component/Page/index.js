'use strict'

const _ = require('lodash')
    , React = require('react')
    , Control = require('../Control')

require('./index.less')

export default class Page extends React.Component {

  render() {
    return (
      <div
        className='horten page'
      >
        <aside className="primary">
          { this.renderNav() }
        </aside>

        <section>
          <Control {...this.state.content} meta={ this.props.meta }/>
        </section>

      </div>
    )
  }

  renderNav() {
    if ( this.props.nav )
      return (
        <nav>
          { _.map( this.props.nav, navItem ) }
        </nav>
      )

    function navItem( item, index ) {
      return (
        <a href='#' key={ index }>{ item.title }</a>
      )
    }
  }
}

  props = Object.assign( { content: {} }, props, global.__HortenPage )

  var content = props.content

  if ( !content.src && !content.type )
    content.src = 'index.md'




}
