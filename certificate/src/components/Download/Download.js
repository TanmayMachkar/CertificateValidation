import { useEffect, useContext, useState } from 'react';
import Web3Context from '../../context/Web3Context';
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import './Download.css';

const Download = () => {
  const { certificateContract, account } = useContext(Web3Context);
  const [hash, setHash] = useState('');
  const [access, setAccess] = useState(false);

  useEffect(() => {
    const checkStudAcc = async () => {
      try {
        toast.loading('Verifying account...');
        const getHash = await certificateContract.getImageHashAndAcc(account);
        setHash(getHash);
        setAccess(true);
        toast.dismiss();
        toast.success('Account is registered');
      } catch (error) {
        console.error(error);
        toast.dismiss();
        toast.error('Access denied');
        setAccess(false);
      }
    };
    if (certificateContract && account) {
      checkStudAcc();
    }
  }, [certificateContract, account]);

  const handleDownload = async () => {
    if (hash) {
      try {
        toast.loading('Downloading certificate...');
        const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificate.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.dismiss();
        toast.success('Download successful');
      } catch (error) {
        console.error(error);
        toast.dismiss();
        toast.error('Download failed');
      }
    }
  };

  return (
    <div>
      {access ? (
        hash ? (
          <div>
		  	<div className = 'pt4 pb4'>
		  		<img width = '60%' src={`https://gateway.pinata.cloud/ipfs/${hash}`} alt="Certificate" />
		  		<Button type="submit" onClick={handleDownload} label="⬇️ Download image" />
		  	</div>
		  </div>
        ) : (
          <p>No certificate available for this account</p>
        )
      ) : (
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
          {account ? (
            <p>Connected account does not have download rights</p>
          ) : (
            <p>Connect wallet to gain download access</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Download;
