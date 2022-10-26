import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
const GoogleLoginButton = () => {
  //center the button
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse); // JWT token
        localStorage.setItem('token', credentialResponse.credential);
      }}
      onError={() => {
        alert('Login failed');
      }}
      type="icon"
      shape="circle"
    />
  );
};

export default GoogleLoginButton;
