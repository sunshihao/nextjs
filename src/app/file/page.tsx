"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default function File() {
  const [files, setFiles] = useState([]);

  useEffect(()=>{
    console.log('files----', files);
  },[files])

  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        allowReorder={true}
        maxFiles={3}
        server={null}
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle='拖拽文件 & 或者 <span class="filepond--label-action">选择图片</span>'
      />
    </div>
  )
}
