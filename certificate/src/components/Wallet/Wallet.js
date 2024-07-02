import { useState, useEffect } from 'react';
import { handleAccountChange } from '../../utils/handleAccountChange';
import { handleChainChange } from '../../utils/handleChainChange';
import { connectWallet } from '../../utils/connectWallet';
import Web3Context from '../../context/Web3Context';
import Button from '../Button/Button';

const Wallet = ({children}) => {
	const [state, setState] = useState({
		provider: null,
		account: null,
		certificateContract: null,
		chainId: null
	})
	const [loading, setLoading] = useState(false);

	const handleWallet = async() => {
		try{
			setLoading(true);
			const {
				provider,
				account,
				certificateContract,
				chainId
			} = await connectWallet();
			console.log(
				"provider: ", provider,
				"account: ", account,
				"contract: ",certificateContract,
				"chainId: ", chainId
			)
			setState({
				provider,
				account,
				certificateContract,
				chainId
			})
		} catch(error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		window.ethereum.on('accountsChanged', () => {
			handleAccountChange(setState);
		})

		window.ethereum.on('chainChanged', () => {
			handleChainChange(setState);
		})

		return () => {
			window.ethereum.removeListener('accountsChanged', () => {
				handleAccountChange(setState);
			})

			window.ethereum.removeListener('chainChanged', () => {
				handleChainChange(setState);
			})
		}
	}, [])

	return(
		<div>
			<Web3Context.Provider value = {state}>
				{children}
			</ Web3Context.Provider>
			{loading && <p>Loading...</p>}
			<Button onClick = {handleWallet} label = 'Connect Wallet' type = 'submit' />
		</div>
	);
}

export default Wallet;