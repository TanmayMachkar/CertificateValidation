import Web3Context from '../../context/Web3Context';
import { useState, useContext, useEffect, useRef } from 'react';
import IPFS from '../IPFS/IPFS';
import UrlToImage from '../Image/UrlToImage';
import './Upload.css';

const Upload = () => {
	const { certificateContract, account } = useContext(Web3Context);
	const [ activeAcc, setActiveAcc ] = useState('');
	const [ clg, setClg ] = useState('');
	const [ hash, setHash ] = useState('');
	const [acc, setAcc] = useState('');


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
			<div className = 'upload-container'>
				<div className="p-container">
			        <div className="p-box">
			          <p>{activeAcc ? '📍 ' + activeAcc : 'Account not registered'}</p>
			        </div>
			        <div className="p-box">
			          <p>{clg ? '🏛️ ' + clg : 'College not registered'}</p>
			        </div>
	      		</div>
      		</div>
			{activeAcc && (
				<>
					<IPFS setHash={setHash} setAcc={setAcc} />
					{hash && (
						<div>
							<img
								src={`https://gateway.pinata.cloud/ipfs/${hash}`}
								style={{ width: '950px', height: 'auto' }}
								className='pb4 pt2'
								alt='Uploaded file'
							/>
							<UrlToImage hash={hash} acc={acc} />
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default Upload;