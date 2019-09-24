import React from 'react'
import Base from '../../base/Control'
import Dropzone from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
const axios = require('axios')

export default class Upload extends Base {
  constructor( props ) {
    super( props )
  }

  onDrop( files ) {
    console.log( "Upload", files )
    this.setState( { files } )
    this.upload()
  }

  upload() {
    const { files } = this.state
    let formData = new FormData()
    _.map( files, ( file, index ) => formData.append(`upload-${index}`, files[0] ) )
    axios.post( '/upload', 
      formData, { 
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(( result ) => this.setState( { result, files: [] } ) )
    .catch(( err ) => console.log('upload dickered', err )) 
  }

  renderSelf() {
    const eachFile = ( file, index ) =>
      <li key={ index }>{ JSON.stringify( file ) }</li>

    let files = _.map( this.state.files, eachFile )



    if ( !files.length )
      return (
        <Dropzone onDrop={ this.onDrop.bind( this ) }>
          {({getRootProps, getInputProps}) => (
            <div className="inner">
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <FontAwesomeIcon icon={faFileUpload} />
              </div>
            </div>
          )}
        </Dropzone>
      )

    return <ul className='files'>{ files }</ul>
  }
}
