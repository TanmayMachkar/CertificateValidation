import { useContext } from 'react';
import Web3Context from '../../context/Web3Context';

const ConnectedAccount = () => {
	const { account } = useContext(Web3Context);

	return(
		<div>
			{account ? <p className = 'btn'>{account}</p> : <p className = 'btn'>Connect Account</p>}
		</div>
	);
}

export default ConnectedAccount;