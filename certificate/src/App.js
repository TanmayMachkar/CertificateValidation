import './App.css';
import Wallet from './components/Wallet/Wallet';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <Wallet>
        <Navigation />
      </ Wallet>
    </div>
  );
}

export default App;
