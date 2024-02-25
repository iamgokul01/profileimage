import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'; 
import axios from 'axios';

// Register the image preview plugin
registerPlugin(FilePondPluginImagePreview);

const App = () => {
  const [files, setFiles] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleInit = () => {
    console.log('FilePond instance has initialised');
  }

  const showImg = () => {}

  return (
    <div>
      <h1>Image Upload</h1>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        oninit={handleInit}
        allowMultiple={false}
        server={{
          process: async (fieldName, file, metadata, load, error, progress, abort) => {
            const formData = new FormData();
            formData.append(fieldName, file);

            try {
              const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              load(response.data.filename); // Assuming your backend returns filename
              console.log(response);
              setIsUploaded(true);
            } catch (err) {
              error('Upload error');
              console.error('Upload error:', err);
            }
          }
        }}
        name="image"
        labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
      />
      {isUploaded && <p>Image uploaded successfully!</p>}

      <div className='see img'>
          <button type='button' onClick={showImg}>See Img</button>
      </div>
    </div>
  );
};

export default App;
