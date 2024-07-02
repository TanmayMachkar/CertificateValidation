import { useContext } from 'react';
import Web3Context from '../../context/Web3Context';

const ConnectedNetwork = () => {
	const { chainId } = useContext(Web3Context);

	if(chainId === null) {
		return <p>Wallet Not Connected</p>
	} else if(chainId === 11155111) {
		return <p>Sepolia Network</p>
	} else {
		return <p>Switch to Sepolia Network</p>
	}
}

export default ConnectedNetwork;