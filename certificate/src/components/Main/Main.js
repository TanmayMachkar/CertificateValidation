import React from 'react';
import './Main.css';

const Main = ({setRoute}) =>{
	return(
		<div>
			<h3>Certificate Validation</h3>
			<div className = "topnav">
				<a href="#news" onClick = {() => setRoute('verify')}><h5>Verify</h5></a>
				<a href="#news" onClick = {() => setRoute('admin')}><h5>Admin</h5></a>
				<a href="#news" onClick = {() => setRoute('upload')}><h5>Upload</h5></a>
				<a href="#news" onClick = {() => setRoute('Home')}><h5>Home</h5></a>
			</div>
		</div>	
	);
}

export default Main;