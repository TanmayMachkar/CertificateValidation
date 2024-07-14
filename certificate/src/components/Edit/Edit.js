import React, { useState, useContext, useEffect, useRef } from 'react';
import Web3Context from '../../context/Web3Context';
import toast from 'react-hot-toast';
import './Edit.css';
import Logo from '../../assets/Logo.png';
import ImgEditor from './ImgEditor';
import Button from '../Button/Button';

const Edit = () => {
  const { certificateContract, account } = useContext(Web3Context);
  const [accessSpecify, setAccessSpecify] = useState(false);
  const tui = useRef(null);
  const [initImg, setInitImg] = useState("");
  const [resultImg, setResultImg] = useState("");
  const [editing, setEditing] = useState(false);

  const getUrl = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setInitImg(url);
  };

  const logImageUrl = () => {
    let instance = tui.current.getInstance();
    let dataUrl = instance.toDataURL();
    setResultImg(dataUrl);
    handleEdit();
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    const checkRegistered = async () => {
      try {
        toast.loading('Getting account info...');
        const getInfo = await certificateContract.getInfo(account);
        toast.dismiss();
        toast.success('Account is registered');
        setAccessSpecify(true);
      } catch (error) {
        setAccessSpecify(false);
        toast.dismiss();
        toast.error('Access denied');
        console.error(error);
      }
    };
    checkRegistered();
  }, [account]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultImg;
    link.download = 'edited-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ height: '80vh' }}>
      {!accessSpecify && (
        <div>
          <svg
            width="380"
            height="380"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 10.5C19.6569 10.5 21 11.8431 21 13.5V19.5C21 21.1569 19.6569 22.5 18 22.5H6C4.34315 22.5 3 21.1569 3 19.5V13.5C3 11.8431 4.34315 10.5 6 10.5V7.5C6 4.18629 8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5V10.5ZM12 3.5C14.2091 3.5 16 5.29086 16 7.5V10.5H8V7.5C8 5.29086 9.79086 3.5 12 3.5ZM18 12.5H6C5.44772 12.5 5 12.9477 5 13.5V19.5C5 20.0523 5.44772 20.5 6 20.5H18C18.5523 20.5 19 20.0523 19 19.5V13.5C19 12.9477 18.5523 12.5 18 12.5Z"
              fill="currentColor"
            />
          </svg>
          {account ? <p>Register current account to start editing</p> : <p>Connect wallet to start editing</p>}
        </div>
      )}
      <div className={accessSpecify ? '' : 'blur'}>
        {accessSpecify && (
          editing ? (
            <ImgEditor logImageUrl={logImageUrl} tui={tui} initImg={initImg} />
          ) : (
            <div>
              <input type="file" accept="img/*" onChange={getUrl} />
              <div className="image-container pl3 pr3">
                <div className="image-item">
                  <div>
                    {initImg === '' ? '' : <p className="cards">Original</p>}
                    <img src={initImg} alt="" className="image" />
                  </div>
                </div>
                <div className="image-item">
                  {resultImg === '' ? '' : <p className="cards">Edited</p>}
                  <img src={resultImg} alt="" className="image" />
                </div>
              </div>
              <div className = 'pt3 pb3'>
                {initImg && !resultImg && <Button type="submit" onClick={handleEdit} label="✏️ Edit Image" />}
                {resultImg && <Button type="button" onClick={handleDownload} label="💾 Download Edited Image" />}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Edit;
