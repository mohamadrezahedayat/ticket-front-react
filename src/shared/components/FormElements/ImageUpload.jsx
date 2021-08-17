import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';

const ImageUpload = (props) => {
  const [files, setFiles] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(props.initialValid);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!files) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(files[0]);
  }, [files]);

  const pickedHandler = (event) => {
    let pickedFiles = [];

    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        pickedFiles.push(event.target.files[i]);
      }
      setFiles(pickedFiles);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFiles, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const renderImagePreview = () => {
    if (previewUrl) return <img src={previewUrl} alt='Preview' />;
    if (props.imageUrl) {
      return <img src={props.imageUrl} alt='profile' />;
    } else return <p>Please pick an image.</p>;
  };
  return (
    <div className='form-control'>
      <input
        id={props.id}
        multiple={props.multiple}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg,.jfif'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>{renderImagePreview()}</div>
        <Button type='button' onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
