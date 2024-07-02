export const handleAccountChange = async(setState) => {
	const accounts = await window.ethereum.request({
		method: 'eth_requestAccounts'
	})
	const account = accounts[0];
	console.log(account);
	setState(prevState => ({...prevState, account}));
}