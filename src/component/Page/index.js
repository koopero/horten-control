'use strict'

const _ = require('lodash')
    , React = require('react')
    , Control = require('../Control')

require('./index.less')
require('../../style/index.less')


class Page extends React.Component {

  constructor( props ) {
    super( props )
    this.state = this.state || {}
    _.merge( this.state, this.props, __HortenPage )
  }

  render() {
    return (
      <div
        className='horten page'
      >
        <aside className="primary">
          { this.renderNav() }
        </aside>

        <section>
          <Control {...this.state.content } meta={ this.props.meta }/>
        </section>

      </div>
    )
  }

  renderNav() {
    const self = this
    if ( this.state.nav )
      return (
        <nav>
          { _.map( this.state.nav, navItem ) }
        </nav>
      )

    function navItem( item, index ) {
      var href, onClick

      if ( item.page ) {
        href = '/page/'+item.page
        onClick = () => null
      } else {
        href = '#'
        onClick = onNavLink
      }

      return (
        <a href={ href } key={ index } onClick={ onClick }>{ item.title }</a>
      )

      function onNavLink() {
        let state = _.merge( {}, self.state, { content: item } )
        self.setState( state )
      }
    }


  }
}

module.exports = Page
