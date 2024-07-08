import CryptoJS from 'crypto-js';
import { useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import Web3Context from '../../context/Web3Context';

const ImageToSha = ({imgData, hash}) => {
	const { certificateContract } = useContext(Web3Context);

	useEffect(() => {
		const stringToSHA256 = async(inputString) => {
		    try{
		    	toast.loading('Transaction pending...');
			    const hashImage = CryptoJS.SHA256(inputString).toString(CryptoJS.enc.Hex);
			    let hexHashImage = '0x' + hashImage;
			    console.log(hexHashImage);

			    const setHash = await certificateContract.setImageHash(hash, hexHashImage);
			    toast.dismiss();
			    toast.success('Transaction successful');
			} catch(error) {
				toast.dismiss();
				toast.error('Transaction failed');
				console.error(error);
			}
		}
		stringToSHA256(imgData);
	}, []);

	return(
		<div>
		</div>
	);
}

export default ImageToSha;