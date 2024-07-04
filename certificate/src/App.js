import './App.css';
import Wallet from './components/Wallet/Wallet';
import Navigation from './components/Navigation/Navigation';
import Main from './components/Main/Main';
import Admin from './components/Admin/Admin';
import Upload from './components/Upload/Upload';
import { useState } from 'react';

function App() {
  const [ route, setRoute ] = useState('home');
  const [accountAddress, setAccountAddress] = useState('');
  const [clgname, setClgname] = useState('');

  return (
    <div className="App">
      <Wallet>
        <Navigation />
        <Main setRoute = {setRoute}/>
        { route === 'admin' ? <Admin setAccountAddress = {setAccountAddress} setClgname = {setClgname} clgname = {clgname} accountAddress = {accountAddress}/> : ''}
        { route === 'upload' ? <Upload accountAddress = {accountAddress} /> : ''}
      </ Wallet>
    </div>
  );
}

export default App;
