import React from 'react';
import './Main.css';
//import logo from '../../assets/Logo.png';

const Main = ({setRoute}) =>{
	return(
		<div className = "topnav">
			<nav style = {{display: 'flex', justifyContent: 'flex-start'}}>
				{/*<img src = {logo} className = 'logo'/>*/}
				<h3 className = 'pl2'>E-Certificate</h3>
			</nav>
			<div>
				<a href="#news" onClick = {() => setRoute('Home')}><h5>Home</h5></a>
				<a href="#news" onClick = {() => setRoute('upload')}><h5>Upload</h5></a>
				<a href="#news" onClick = {() => setRoute('admin')}><h5>Admin</h5></a>
				<a href="#news" onClick = {() => setRoute('verify')}><h5>Verify</h5></a>
			</div>
		</div>	
	);
}

export default Main;