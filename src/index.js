'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import App from './App';

const responseGoogle = (response) => {
	console.log(response);
}
const responseFacebook = (response) => {
	console.log(response);
}
ReactDOM.render(
	<div>
	<GoogleLogin
	clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
	buttonText="Login With Google"
	onSuccess={responseGoogle}
	onFailure={responseGoogle}
	/>
	<FacebookLogin
	appId="1088597931155576"
	autoLoad={true}
	callback={responseFacebook} />
	<App />
	</div>,
	document.getElementById('root')
	);