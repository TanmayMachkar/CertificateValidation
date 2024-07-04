import CryptoJS from 'crypto-js';
import { useState, useEffect, useContext } from 'react';
import Web3Context from '../../context/Web3Context';

const ImageToSha = ({imgData, hash}) => {
	const { certificateContract } = useContext(Web3Context);

	useEffect(() => {
		const stringToSHA256 = async(inputString) => {
		    try{
			    const hashImage = CryptoJS.SHA256(inputString).toString(CryptoJS.enc.Hex);
			    let hexHashImage = '0x' + hashImage;
			    console.log(hexHashImage);

			    const setHash = await certificateContract.setImageHash(hash, hexHashImage);
				console.log("done...");
			} catch(error) {
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