import { useContext, useState, useEffect } from 'react';
import Web3Context from '../../context/Web3Context';
import Button from '../Button/Button';
import { toast } from 'react-hot-toast';
// import Loading from '../Loading/Loading';
import './Admin.css';

const Admin = ({setAccountAddress, setClgname, clgname, accountAddress}) => {
	const { certificateContract, account } = useContext(Web3Context);
	const [access, setAccess] = useState(false);

	useEffect(() => {
		const getAdminInfo = async(e) => {
			try{
				toast.loading('Verifying account...');
				const getAdmin = await certificateContract.getAdmin(account);
				toast.dismiss();
				toast.success('Account verified');
				setAccess(true);
			} catch(error) {
				toast.dismiss();
				toast.error('Access denied');
				console.error(error);
				setAccess(false);
			}
		}
		getAdminInfo();
	}, [account]);

	const handleInput = async(e) => {
		e.preventDefault();
		try{
			toast.loading('Transaction pending...');
			const setInfo = await certificateContract.setInfo(accountAddress, clgname);
			toast.dismiss();
			toast.success('Transaction successful');
		} catch(error) {
			toast.dismiss();
			toast.error('Transaction failed');
			console.error(error);
		}
	}

	return(
		<div>
			{access ? (
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
				</div>
			) : (
				<div>
		          <svg
		            width="380"
		            height="380"
		            viewBox="0 0 24 24"
		            fill="none"
		            xmlns="http://www.w3.org/2000/svg"
		          >
		            <path
		              fillRule="evenodd"
		              clipRule="evenodd"
		              d="M18 10.5C19.6569 10.5 21 11.8431 21 13.5V19.5C21 21.1569 19.6569 22.5 18 22.5H6C4.34315 22.5 3 21.1569 3 19.5V13.5C3 11.8431 4.34315 10.5 6 10.5V7.5C6 4.18629 8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5V10.5ZM12 3.5C14.2091 3.5 16 5.29086 16 7.5V10.5H8V7.5C8 5.29086 9.79086 3.5 12 3.5ZM18 12.5H6C5.44772 12.5 5 12.9477 5 13.5V19.5C5 20.0523 5.44772 20.5 6 20.5H18C18.5523 20.5 19 20.0523 19 19.5V13.5C19 12.9477 18.5523 12.5 18 12.5Z"
		              fill="currentColor"
		            />
		          </svg>
		          {account ? <p>Connected account does not have admin rights</p> : <p>Connect wallet to gain admin access</p>}
		        </div>
			)}
		</div>
	);
}

export default Admin;