import Web3Context from '../../context/Web3Context';
import { useState, useContext, useEffect, useRef } from 'react';
import IPFS from '../IPFS/IPFS';
import UrlToImage from '../Image/UrlToImage';

const Upload = () => {
	const { certificateContract, account } = useContext(Web3Context);
	const [ activeAcc, setActiveAcc ] = useState('');
	const [ clg, setClg ] = useState('');
	const [ hash, setHash ] = useState('');

	const handleClgname = async() => {
		try{
			const accounts = account;
			const getInfo = await certificateContract.getInfo(accounts);
			setActiveAcc(accounts);
			//console.log(typeof getInfo);
			setClg(getInfo);
		} catch(error) {
			console.error(error);
		}
	}

	useEffect(() => {
		handleClgname();
	}, [certificateContract, account]);

	return(
		<div>
			<p>{activeAcc ? activeAcc : 'Account not registered'}</p>
			<p>{clg ? clg : 'College not registered'}</p>
			<IPFS setHash = {setHash}/>
			{ hash && 
				<div>
					<img src = {`https://gateway.pinata.cloud/ipfs/${hash}`} />
					<UrlToImage hash = {hash} />
				</div>
			}
		</div>
	);
}

export default Upload;