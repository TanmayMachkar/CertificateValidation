import { useContext, useState } from 'react';
import Web3Context from '../../context/Web3Context';
import Button from '../Button/Button';
import CryptoJS from 'crypto-js';

const Verify = () => {
  const { certificateContract } = useContext(Web3Context);
  const [file, setFile] = useState(null);
  const [verified, setVerified] = useState(false);
  const [hashh, setHashh] = useState('');

  const stringToSHA256 = async () => {
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const fileData = reader.result;

        const hashImage = CryptoJS.SHA256(fileData).toString(CryptoJS.enc.Hex);
        const hexHashImage = '0x' + hashImage;

        const setHash = await certificateContract.getImageHash(hexHashImage);
        setHashh(setHash);
        setVerified(true);
      };

      reader.onerror = (error) => {
        console.error('Error converting file:', error);
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button type="button" onClick={stringToSHA256} label="Verify" />
        {verified ? 
        	<div>
        		<p>Certificate verified</p>
        		<img src = {`https://gateway.pinata.cloud/ipfs/${hashh}`} />
        	</div> 
        		: 
        	<p>Certificate not valid</p>
        }
      </form>
    </div>
  );
};

export default Verify;

//0x9cd89e362ed99f1c95af68c5c4aa01b45deab2fa4c47d60b0c71d817a6b6d4c3