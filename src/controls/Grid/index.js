'use strict'

import _ from 'lodash'
import React from 'react'
import Base from '../Base'
import Trigger from '../../components/Trigger'

export default class Grid extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'grid'
  }

  renderSelf() {
    const self = this
      , w = Math.max( 0, parseInt( this.props.cols ) ) || 1
      , h = Math.max( 0, parseInt( this.props.rows ) ) || 1
      , rows = _.range( h )
      , cols = _.range( w )

    return (
      <table><tbody>
        { _.map( rows, renderRow ) }
      </tbody></table>
    )

    function renderRow( y ) {
      return (
        <tr key={ y } >
          { _.map( cols, renderCell ) }
        </tr>
      )

      function renderCell( x ) {
        const ind = w * y + x
          , cellPath = '/'+y+'/'+x
          , path = H.path.resolve( self.state.path, cellPath )
          , props = _.extend(
            { type: 'trigger', path: path, hide: 'all' },
            { toggle: true },
            // { title: cellPath }
          )

        return (
          <td key={ ind }>
            <Trigger {...props }/>
          </td>
        )
      }

    }
  }
}
