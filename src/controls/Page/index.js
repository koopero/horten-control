'use strict'

import _ from 'lodash'
import React from 'react'
import Control from '../Control'
import Markdown from '../Markdown'
import yaml from 'js-yaml'
import YAML from '../../components/YAML'
import request from 'browser-request'
import pathlib from 'path'
import * as mdutil from '../Markdown/util'
import HortenWebSocket from 'horten-websocket'
import ErrorTag from '../../components/ErrorTag'

const embarkdown = require('embarkdown')

const frontmatter = require('front-matter')

require('./index.less')


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
    this.initializeLoad()
    this.state.websocket.open()
  }

  async initializeLoad() {
    let site = await embarkdown.ingest( this.state.content )
    let pages = site.pages( {
      minLevel: 1,
      maxLevel: 1,
    }) 

    this.setState( Object.assign( {}, this.state, { site, pages } ) )
  }

  render() {


    let regions = ['topbar','content','sidebar','afterContent']
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


  // loadFile( url ) {
  //   let file = this.state.files[url] = this.state.files[url] || { url, loaded: false } 
  //   if ( !file.request ) {
  //     Object.defineProperty( file, 'request', { enumerable: false, writable: true } )
  //     file.request = request( { url }, 
  //       ( err, res ) => this._onFileLoaded({
  //         err, res, url, file
  //       })
  //     )
  //   }

  //   return file
  // }

  // _onFileLoaded( { err, res, url, file } ) {
  //   if ( err || res.statusCode >= 400 ) {
  //     file.error = err || res.statusText
  //     file.loaded = false
  //     this.refreshNext()
  //     return
  //   }

  //   let extOrig = pathlib.extname( url )
  //   let ext = extOrig.toLowerCase()
  //   while( ext[0] == '.' ) ext = ext.substr( 1 )

  //   file.loaded = true
  //   file.contents = res.body
  //   // file.contents = res.body
  //   file.ext = ext
  //   file.name = pathlib.basename( url, extOrig )
  //   file.idPrefix = `${file.name}-`

  //   switch( ext ) {
  //   case 'md':
  //   case 'markdown':
  //     let markdown = file.contents
  //     let front = frontmatter( markdown )
  //     file.index = mdutil.makeIndex( { path: [ file.name ], markdown, idPrefix: file.idPrefix } ) 
  //     file.markdown = file.contents
  //     // file.index = 'foo?'

  //     break

  //   case 'yaml':
  //   case 'json':
  //     let data, error
  //     try {
  //       data = yaml.load( file.contents )
  //     } catch( err ) {
  //       error = err
  //     }

  //     if ( error ) {
  //       file.error = error
  //     } else {
  //       Object.defineProperty( file, 'yaml', { value: data, enumerable: false } )
  //       // console.log( data )
  //       this.state.meta = _.merge( this.state.meta, data.meta )
  //     }
  //     break
  //   }

  //   this.refreshNext()
  // }

  // refreshNext() {
  //   if ( this.state.timer ) 
  //     clearTimeout( this.state.timer )

  //   this.state.timer = setTimeout( () => this.forceUpdate() )
  // }

  // renderOLD() {
  //   let pages = this.state.pages || []
  //   pages = _.map( pages, ( page ) => this.loadFile( page ) )
  //   pages = _.sortBy( pages, 'order' )

  //   pages = _.map( pages, (page, index ) => {
  //     if ( 'undefined' != typeof page.error ) {
  //       return <pre className="error">{ page.url } { page.error.toString() }</pre>
  //     }

  //     let content
  //     let className = ''
  //     let meta = _.merge( {}, this.state.meta, page.meta )

  //     if ( page.markdown )
  //       content = <Markdown 
  //         {...page}
  //         meta={meta}
  //       />

  //     return <section className={className} key={index}>
  //       <span className='url'>{ page.url }</span>
  //       {/* <pre className='debug'>{ JSON.stringify( meta, null, 2 ) }</pre> */}
  //       { content }
  //     </section>
  //   })

  //   let index = this.renderIndex()

  //   return ( <div className='horten page'>
  //     { index }
  //     { pages }
  //   </div> )
  // }


  renderRegion( region ) {
    let className = `region-${region}`
    let content 

    switch( region ) {
      case 'topbar':
        content = this.renderTopBar()
      break

      case 'content':
        content = <YAML data={this.state.pages}/>
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
    let title = 'Title'

    return <h1 className='topbar-title'>{ title }</h1>
  }

  renderContent( src ) {
    let content = 'no content yet' || this.state.pages[0]

    let className = ''
    let meta = _.merge( {}, this.state.meta,content.meta )

    if ( content.error )
      return <ErrorTag
        {...content.error}
      />

    if ( content.markdown )
      return <Markdown 
        {...content}
        meta={meta}
      />


    return src
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
