import { ethers } from 'ethers';
import CertificateABI from '../../src/ABI/CertificateABI.json';

export const connectWallet = async() => {
	try{
		let [
			provider,
			account,
			certificateContract,
			chainId
		] = [null];

		if(window.ethereum === null) {
			throw new Error("Metamask not installed");
		}

		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts'
		});

		account = accounts[0];

		if(!account) {
			throw new Error('There are no accounts in your wallet')
		}

		let getChainId = await window.ethereum.request({
			method: 'eth_chainId'
		})
		chainId = parseInt(getChainId, 16);

		provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();

		const certificateContractAddress = '0xCD7f3D1530e03D42011C30c39dC074E2CdE42456';
		certificateContract = new ethers.Contract(certificateContractAddress, CertificateABI, signer);

		return({
			provider,
			account,
			certificateContract,
			chainId
		})
	} catch(error) {
		console.error(error);
		throw error;
	}
}