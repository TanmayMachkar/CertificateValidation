import React, { useState } from 'react';
import { PinturaEditor } from '@pqina/react-pintura';
import { getEditorDefaults } from '@pqina/pintura';
import '@pqina/pintura/pintura.css';

const Edit = () => {
  const [inlineResult, setInlineResult] = useState();
  const [imageSrc, setImageSrc] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ height: '80vh' }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {imageSrc && (
        <PinturaEditor
          {...getEditorDefaults()}
          src={imageSrc}
          onProcess={(res) => setInlineResult(URL.createObjectURL(res.dest))}
        />
      )}

      {inlineResult && <img src={inlineResult} alt="" />}
    </div>
  );
}

export default Edit;
