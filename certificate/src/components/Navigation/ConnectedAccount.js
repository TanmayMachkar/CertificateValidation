import { useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import './ConnectedAccount.css';

const ConnectedAccount = () => {
	const { account } = useContext(Web3Context);

	return(
		<div>
			{account ?
				<div className = 'pt2'>
					<div className = 'tooltip-container'>
						<span className="tooltip">Connected account</span>
						<span className = 'text'>{account}</span> 
					</div>
				</div>
					: 
				<div className = 'tooltip container'>
					<span class="tooltip">Connect account</span>
					<p className = 'connected-ac'>No account connected</p> 
				</div>
			}
		</div>
	);
}

export default ConnectedAccount;