import { React } from 'react';
import ConnectedAccount from './ConnectedAccount';
import ConnectedNetwork from './ConnectedNetwork';
import './Navigation.css';

const Navigation = () => {
	return(
		<div>
			<header>
				<ConnectedAccount />
				<ConnectedNetwork />
			</header>
		</div>
	);
}

export default Navigation;