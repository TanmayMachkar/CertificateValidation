import { useContext } from 'react';
import Web3Context from '../../context/Web3Context';

const ConnectedNetwork = () => {
	const { chainId } = useContext(Web3Context);

	if(chainId === null) {
		return <p className = 'btn'>Wallet Not Connected</p>
	} else if(chainId === 11155111) {
		return <p className = 'btn'>Sepolia Network</p>
	} else {
		return <p className = 'btn'>Switch to Sepolia Network</p>
	}
}

export default ConnectedNetwork;