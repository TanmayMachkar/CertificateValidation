import { useContext, useState } from 'react';
import Web3Context from '../../context/Web3Context';
import Button from '../Button/Button';
import { toast } from 'react-hot-toast';
// import Loading from '../Loading/Loading';
import './Admin.css';

const Admin = ({setAccountAddress, setClgname, clgname, accountAddress}) => {
	const { certificateContract } = useContext(Web3Context);
	const [loading, setLoading] = useState(false);

	const handleInput = async(e) => {
		e.preventDefault();
		try{
			toast.loading('Transaction pending...');
			setLoading(true);
			const setInfo = await certificateContract.setInfo(accountAddress, clgname);
			toast.dismiss();
			toast.success('Transaction successful');
		} catch(error) {
			toast.dismiss();
			toast.error('Transaction failed');
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return(
		<div>
			<div className = 'pb2'>
				<div className = "input-container">
					<input className = "input-field" type = "text" onChange = {(e) => setAccountAddress(e.target.value)} placeholder = 'Enter account address' />
					<label for = "input-field" className = "input-label">Enter account address</label>
					<span class="input-highlight"></span>
				</div>
			</div>

			<div className = "input-container">
				<input className = "input-field" type = "text" onChange = {(e) => setClgname(e.target.value)} placeholder = 'Enter college name' />
				<label for = "input-field" className = "input-label">Enter college name</label>
				<span class="input-highlight"></span>
			</div>
			<Button type = 'submit' label = '➤ Submit Info' onClick = {handleInput} />
			{/*{loading && <Loading />}*/}
		</div>
	);
}

export default Admin;