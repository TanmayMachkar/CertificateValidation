import axios from 'axios';
import { useState } from 'react';
import Button from '../Button/Button';

const IPFS = ({setHash}) => {
  const [ file, setFile ] = useState(null);
  const [ fileUrl, setFileUrl ] = useState('');
  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log(process.env.REACT_APP_PINATA_API_KEY);
    //console.log(file);
    try{
      const fileData = new FormData();
      fileData.append('file', file);
      const responseData = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: fileData,
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
          'Content-Type': 'multipart/form-data'
        }
      })
      const fileUrl = 'https://gateway.pinata.cloud/ipfs/' + responseData.data.IpfsHash;
      //console.log(fileUrl);
      setHash(responseData.data.IpfsHash);
      setFileUrl(fileUrl);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form>
      <input type = 'file' onChange = {(e) => setFile(e.target.files[0])} />
      <Button type = 'submit' onClick = {handleSubmit} label = 'Upload' />
      </form>
    </div>
  );
}

export default IPFS;
