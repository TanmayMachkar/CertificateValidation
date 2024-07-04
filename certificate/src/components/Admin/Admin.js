import { useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import Button from '../Button/Button';

const Admin = ({setAccountAddress, setClgname, clgname, accountAddress}) => {
	const { certificateContract } = useContext(Web3Context);
	const handleInput = async(e) => {
		e.preventDefault();
		try{
			const setInfo = await certificateContract.setInfo(accountAddress, clgname);
		} catch(error) {
			console.error(error);
		}
	}

	return(
		<div>
			<form>
				<input onChange = {(e) => setAccountAddress(e.target.value)} placeholder = 'Enter account address'/>
				<input onChange = {(e) => setClgname(e.target.value)} placeholder = 'Enter college name'/>
				<Button type = 'submit' label = 'Submit Info' onClick = {handleInput} />
			</form>
		</div>
	);
}

export default Admin;