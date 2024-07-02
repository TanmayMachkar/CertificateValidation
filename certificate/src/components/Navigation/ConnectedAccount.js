import { useContext } from 'react';
import Web3Context from '../../context/Web3Context';

const ConnectedAccount = () => {
	const { account } = useContext(Web3Context);

	return(
		<div>
			{account ? account : 'Connect Account'}
		</div>
	);
}

export default ConnectedAccount;