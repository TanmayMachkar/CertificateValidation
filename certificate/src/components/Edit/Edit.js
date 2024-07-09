import React, { useState, useContext, useEffect } from 'react';
import Web3Context from '../../context/Web3Context';
import { PinturaEditor } from '@pqina/react-pintura';
import { getEditorDefaults } from '@pqina/pintura';
import '@pqina/pintura/pintura.css';
import toast from 'react-hot-toast';

const Edit = () => {
  const [ inlineResult, setInlineResult ] = useState();
  const [ imageSrc, setImageSrc ] = useState();
  const { certificateContract, account } = useContext(Web3Context);
  const [ accessSpecify, setAccessSpecify ] = useState(false);

  useEffect(() => {
    const checkRegistered = async() => {
      try{
        toast.loading('Getting account info...');
        const getInfo = await certificateContract.getInfo(account);
        toast.dismiss();
        toast.success('Account is registered');
        setAccessSpecify(true);
      } catch(error) {
        setAccessSpecify(false);
        toast.dismiss();
        toast.error('Access denied');
        console.error(error);
      }
    }
    checkRegistered();
  }, [account]);

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
