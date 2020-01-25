'use strict'

import _ from 'lodash'
import React from 'react'
import Markdown from '../Markdown'
import YAML from '../../components/YAML'
import HortenWebSocket from 'horten-websocket'
import ErrorTag from '../../components/ErrorTag'
import { createHashHistory } from 'history'

const embarkdown = require('embarkdown')

// require('./index.less')


export default class Page extends React.Component {
  
  constructor( props ) {
    super( props )
    this.state = this.state || {}
    this.state.files = {}
    _.merge( this.state, 
      { content: '/horten-control/demo/intro.md', sidebar: '!nav' },
      { meta: require('../meta.js') }, 
      this.props, 
      __HortenPage 
    )

    this.state.websocket = new (HortenWebSocket.Client)()
  }

  componentDidMount() {
    const history = this.state.history || createHashHistory()
    this.initializeLoad()
    this.state.websocket.open()
    this.state.history = history
    console.log('initial', history )
    this.state.unlistenHistory = history.listen( this.onHistory.bind( this ) )
    this.setNavPathname( history.location.pathname )
  }

  setNavPathname( pathname ) {
    pathname = _.trimStart( pathname, '/' )
    let path = pathname.split('/')
    let state = _.merge( {}, this.state, { path } )
    this.setState( state )    
  }

  onHistory( location, action ) {
    console.log( "onHistory", location, action )
    this.setNavPathname( location.pathname )
  }

  componentWillUnmount() {

  }

  async initializeLoad() {
    console.log( 'content', this.state.content )
    let site = await embarkdown.ingest( this.state.content )
    let pages = site.pages( {
      minLevel: 1,
      maxLevel: 1,
    }) 

    this.setState( Object.assign( {}, this.state, { site, pages } ) )
  }

  render() {
    let regions = ['content','sidebar','topbar']
    let regionsRendered = regions.map( region => this.renderRegion( region ) )
    let hasRegions = _.filter( regions, (region,index) => !!regionsRendered[index] )

    hasRegions = hasRegions.map( region => `has-${region}`)
    hasRegions = hasRegions.join(' ')

    let className = ''
    className += hasRegions
    return ( <div className={className}>
      { regionsRendered }
    </div> )      
  }

  renderRegion( region ) {
    let className = `region-${region}`
    let content 

    switch( region ) {
      case 'topbar':
        content = this.renderTopBar()
      break

      case 'sidebar':
        content = this.renderSidebar()
      break

      case 'content':
        if ( _.isArray( this.state.pages ) ) {
          content = this.renderContent( this.state.pages[0] )
        } else {
          content = <YAML data={this.state.pages}/>
        }
      break

    }


    // let src = this.state[region]
    // if ( src && !_.isArrayLikeObject( src ) )
    //   src = [ src ]
    // let content = src && src.map( src => this.renderContent( src ) )
    if ( content )
      return <section className={className} key={region}>{ content }</section>

    return null
  }

  renderTopBar() {
    let title = ''

    return [ 
      <h1 className='topbar-title'>{ title }</h1>,
      this.renderSelectNav()
    ]
  }

  renderSelectNav() {
    let items = _.map( this.state.pages, ( page, index ) => {
      let { title, path } = page

      return <option key={ index } value={ path.join('/')}>{ page.title }</option>
    } ) 

    const onChange = ( event ) => {
      let path = event.target.value
      this.state.history.replace( '/'+path)
    }

    let path = this.state.path || []

    return <select value={ path.join('/') } onChange={onChange}>{ items }</select>
  }

  onNavigatePage( event, page ) {
    this.state.history.replace( '/'+page.path.join('/'))
    if ( page.title )
      window.document.title = page.title
    event.preventDefault()
  }


  renderSidebar() {
    const navItem = ( item ) => {
      let { title, path } = item
      let onClick = () => {
        let state = _.merge( {}, this.state, { path } )
        this.setState( state )
      }
      let className = 'nav'
      if ( pathMatches( this.state.path, path ) )
        className += ' active'

      let hash = pageToHash( item )

      return  <a className={className} onClick={ ( event )=>this.onNavigatePage( event, item ) } href={hash}>{ title }</a>
    }

    let items = _.map( this.state.pages, ( page, index ) => {
      return <li key={ index }>{ navItem( page ) }</li>
    } ) 

    return <nav><ul>{ items }</ul></nav>
  }


  renderContent() {
    let content = _.find( this.state.pages, page => pathMatches( page.path, this.state.path ) ) || ( this.state.pages && this.state.pages[0] ) || {}
    let path = content.path || []
    let key = path.join('/')

    let className = ''
    let meta = _.merge( {}, this.state.meta, content.data && content.data.meta )

    if ( content.error )
      return <ErrorTag
        {...content.error}
      />

    if ( content.markdown )
      return <Markdown 
        {...content}
        meta={meta}
        key={key}
      />


    return 'No content'
  }

  renderIndex() {
    let pages = this.state.pages || []
    pages = _.map( pages, ( page ) => this.loadFile( page ) )
    pages = _.sortBy( pages, 'order' )
    
    let items =  _.map( pages, props => props.index )
    items = _.filter( items, _.isArray )
    items = _.flatten( items ) 

    let tree = {}
    _.map( items, item => {
      let { path } = item
      let targ = tree

      _.each( path, seg => {
        targ.items = targ.items || {}
        let next = targ.items[seg] = targ.items[seg] || {}
        next.text = next.text || seg
        targ = next
      } )

      _.merge( targ, item )
    } )

    function sortItem( item ) {
      item.items = _.map( item.items, item => sortItem( item ) )
      item.items = _.sortBy( item.items, ['order'] )
      
      return item
    }


    function renderTree( item, key ) {
      if ( item.items && item.items.length )
        var items = <ul className='subs'>{ _.map( item.items, renderTree ) }</ul>

      return <li className={`branch level-${item.level}`} key={key}>
        <a className='text' href={ item.link }>{ item.text }</a>
        { items }
      </li>
    }

    sortItem( tree )

    // return <pre>{ JSON.stringify( items, null, 2 ) }</pre>
    return renderTree( tree, 0  )
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

      href = pageToHash( item )
      onClick = onNavLink

      return (
        <a href={ href } key={ index } onClick={ onClick } href={href}>{ item.title }</a>
      )

      function onNavLink() {
        let state = _.merge( {}, self.state, { content: item } )
        self.setState( state )
      }
    }
  }
}

function pathMatches( a, b ) {
  if ( !_.isArray( a ) || !_.isArray( b ) )
    return false

  let k = Math.min( a.length, b.length )
  for ( let i = 0; i < k; i ++ ) 
    if ( a[i] != b[i] )
      return false 

  return true
}

function pageToHash( page ) {
  return '#'+page.path.join('-')
}