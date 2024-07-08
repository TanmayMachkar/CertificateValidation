import { useContext, useState } from 'react';
import Web3Context from '../../context/Web3Context';
import Button from '../Button/Button';
import CryptoJS from 'crypto-js';
import { toast } from "react-hot-toast";
import '../IPFS/Input.css';

const Verify = () => {
  const { certificateContract } = useContext(Web3Context);
  const [file, setFile] = useState(null);
  const [verified, setVerified] = useState(false);
  const [hashh, setHashh] = useState('');
  const [notVerified, setNotVerified] = useState(1);

  const stringToSHA256 = async () => {
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }

      toast.loading("Verifying...");

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const fileData = reader.result;

        const hashImage = CryptoJS.SHA256(fileData).toString(CryptoJS.enc.Hex);
        const hexHashImage = '0x' + hashImage;

        try {
          const setHash = await certificateContract.getImageHash(hexHashImage);
          toast.dismiss();
          toast.success('Certificate verified');
          setHashh(setHash);
          setVerified(true);
        } catch (error) {
          if (error.reason === "Hash not found") {
            toast.dismiss();
            toast.error('Certificate not valid');
            setNotVerified(2);
          } else {
            throw error;
          }
        }
      };

      reader.onerror = (error) => {
        toast.dismiss();
        toast.error('Certificate not valid');
        console.error('Error converting file:', error);
      };
    } catch (error) {
      toast.dismiss();
      toast.error('Certificate not valid');
      setNotVerified(2);
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button type="button" onClick={stringToSHA256} label="🔎 Verify" />
        {verified &&
          <div>
            <p>Certificate verified</p>
            <img src = {`https://gateway.pinata.cloud/ipfs/${hashh}`} />
          </div>
        }
        { notVerified === 2 ? <p>Certificate not valid</p> : ''}
      </form>
    </div>
  );
};

export default Verify;
