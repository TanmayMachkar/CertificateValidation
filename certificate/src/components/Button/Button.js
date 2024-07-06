import { React } from 'react';
import './Button.css';

const Button = ({type, label, onClick}) => {
	return(
		<div>
			<button type = {type} onClick = {onClick} className = 'CN button'>
				<span>{label}</span>
			</button>
		</div>
	);
}

export default Button;