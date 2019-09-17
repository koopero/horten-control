import React from 'react'
import Base from '../../base/Control'
import Dropzone from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-regular-svg-icons'

export default class Upload extends Base {
  constructor( props ) {
    super( props )
  }

  renderSelf() {
    return (
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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
  }
}
