import { useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import './ConnectedAccount.css';

const ConnectedAccount = () => {
	const { account } = useContext(Web3Context);

	return(
		<div>
			{account ? <p className = 'connected-ac'>{account}</p> : <p className = 'connected-ac'>Connect Account</p>}
		</div>
	);
}

export default ConnectedAccount;