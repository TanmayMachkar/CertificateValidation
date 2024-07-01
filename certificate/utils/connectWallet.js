import { ethers, Contract } from 'ethers';
import CertificateABI from '../../src/ABI/CertificateABI.json';

export const connectWallet = async() => {
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
}