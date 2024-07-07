import { useContext } from 'react';
import Web3Context from '../../context/Web3Context';

const ConnectedNetwork = () => {
	const { chainId } = useContext(Web3Context);

	if(chainId === null) {
		return <div className = 'pt2'>
					<div className = 'tooltip-container'>
						<span className="tooltip">Connect Wallet</span>
						<span className = 'text'>Wallet not connected</span> 
					</div>
				</div>
	} else if(chainId === 11155111) {
		return <div className = 'pt2'>
					<div className = 'tooltip-container'>
						<span className="tooltip">Network</span>
						<span className = 'text'>📶 Sepolia</span> 
					</div>
				</div>
	} else {
		return <div className = 'pt2'>
					<div className = 'tooltip-container'>
						<span className="tooltip">Invalid network</span>
						<span className = 'text'>Switch to sepolia</span> 
					</div>
				</div>
	}
}

export default ConnectedNetwork;