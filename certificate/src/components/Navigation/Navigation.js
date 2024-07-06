import { React } from 'react';
import ConnectedAccount from './ConnectedAccount';
import ConnectedNetwork from './ConnectedNetwork';
import './Navigation.css';

const Navigation = () => {
	return(
		<div>
			<header className = 'header'>
				<div className = 'rightAligned'>
					<ConnectedAccount />
					<ConnectedNetwork />
				</div>
			</header>
		</div>
	);
}

export default Navigation;