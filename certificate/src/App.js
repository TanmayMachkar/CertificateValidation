import './App.css';
import Wallet from './components/Wallet/Wallet';
import Navigation from './components/Navigation/Navigation';
import IPFS from './components/IPFS/IPFS';
import Main from './components/Main/Main';
import { useState } from 'react';

function App() {
  const [ route, setRoute ] = useState('home');
  return (
    <div className="App">
      <Wallet>
        <Navigation />
        <Main setRoute = {setRoute}/>
        { route === 'upload' ? <IPFS /> : ''}
      </ Wallet>
    </div>
  );
}

export default App;
