import { useContext } from 'react';
import Web3Context from '../../context/Web3Context';

const ConnectedNetwork = () => {
	const { chainId } = useContext(Web3Context);

	if(chainId === null) {
		return <p className = 'connected-ac'>Wallet Not Connected</p>
	} else if(chainId === 11155111) {
		return <p className = 'connected-ac'>Sepolia Network</p>
	} else {
		return <p className = 'connected-ac'>Switch to Sepolia Network</p>
	}
}

export default ConnectedNetwork;