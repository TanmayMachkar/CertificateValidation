import React, { useState, useContext, useEffect } from 'react';
import Web3Context from '../../context/Web3Context';
import toast from 'react-hot-toast';
import './Edit.css';

const Edit = () => {
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
      {
        !accessSpecify && 
          (
          <div>
            <svg
              width="380"
              height="380"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18 10.5C19.6569 10.5 21 11.8431 21 13.5V19.5C21 21.1569 19.6569 22.5 18 22.5H6C4.34315 22.5 3 21.1569 3 19.5V13.5C3 11.8431 4.34315 10.5 6 10.5V7.5C6 4.18629 8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5V10.5ZM12 3.5C14.2091 3.5 16 5.29086 16 7.5V10.5H8V7.5C8 5.29086 9.79086 3.5 12 3.5ZM18 12.5H6C5.44772 12.5 5 12.9477 5 13.5V19.5C5 20.0523 5.44772 20.5 6 20.5H18C18.5523 20.5 19 20.0523 19 19.5V13.5C19 12.9477 18.5523 12.5 18 12.5Z"
                fill="currentColor"
              />
            </svg>
            {account ? <p>Register current account to start editing</p> : <p>Connect wallet to start editing</p>}
          </div>
          )
      }
      <div className = {accessSpecify ? '' : 'blur'}>
        {accessSpecify && <input type="file" accept="image/*" onChange={handleFileChange} />}
      </div>
    </div>
  );
}

export default Edit;
