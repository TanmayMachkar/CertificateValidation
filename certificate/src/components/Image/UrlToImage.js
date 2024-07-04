import { useState, useEffect } from 'react';
import ImageToSha from './ImageToSha';

const UrlToImage = ({hash}) => {
  const [imgData, setImgData] = useState('');

  useEffect(() => {
    const urlToImageObject = async (url) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;

          const imageObj = {
            url,
            imageData: base64data,
          };
          //console.log(imageObj.imageData);
          setImgData(imageObj.imageData);
        };
      } catch (error) {
        console.error('Error fetching and converting image:', error);
      }
    };
    urlToImageObject(exampleUrl);
  }, [hash]);

  const exampleUrl = `https://gateway.pinata.cloud/ipfs/${hash}`;

  return (
    <div>
      {imgData && <ImageToSha imgData = {imgData} hash = {hash}/>}
    </div>
  );
}

export default UrlToImage;
