import Footer from '../Footer/Footer';
import './Home.css';

const Home = () => {
	return(
		<>
		<div className="grid-container mt2 ml2 mr2">
		  <div className="box1">Welcome to E-Certificate.</div>
		  <div className="box2 card">
		  	<h1 className = 'h1 pp'>Why Verify with Blockchain?</h1>
		  	<div className = 'p'>
		  		<p>Blockchain provides a tamper-proof, secure way to verify certificates</p>
			  	<p>All verification processes are transparent and verifiable by anyone</p>
			  	<p>Built on decentralized technology, ensuring trust and authenticity</p>
		  	</div>
		  </div>
		  <div className="box3 card">
		  	<h1 className = 'h1'>Start Verifying Now</h1>
		  	<div className = 'p'>
		  		<span>
		  			<div className = 'b'>Step 1</div> Upload your certificate
		  		</span>
		  		<span>
		  			<div className = 'b mt1 mb1'>Step 2</div> Click 'Verify'
		  		</span>
		  		<span>
		  			<div className = 'b mt1'>Step 3</div> Get instant results
		  		</span>
		  	</div>
		  </div>
		</div>
		<footer>
			<Footer />
		</footer>
		</>
	);
}

export default Home;