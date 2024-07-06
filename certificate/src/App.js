import './App.css';
import Wallet from './components/Wallet/Wallet';
import Navigation from './components/Navigation/Navigation';
import Main from './components/Main/Main';
import Admin from './components/Admin/Admin';
import Upload from './components/Upload/Upload';
import Verify from './components/Verify/Verify';
import { useState } from 'react';

function App() {
  const [ route, setRoute ] = useState('home');
  const [accountAddress, setAccountAddress] = useState('');
  const [clgname, setClgname] = useState('');

  return (
    <div className="App">
      {/*// <div className="bg"></div>
      // <div className="bg bg2"></div>
      // <div className="bg bg3"></div>*/}
      <Wallet>
        <Main setRoute = {setRoute}/>
        <Navigation />
        { route === 'admin' ? <Admin setAccountAddress = {setAccountAddress} setClgname = {setClgname} clgname = {clgname} accountAddress = {accountAddress}/> : ''}
        { route === 'upload' ? <Upload accountAddress = {accountAddress} /> : ''}
        { route === 'verify' ? <Verify /> : ''}
      </ Wallet>
    </div>
  );
}

export default App;
