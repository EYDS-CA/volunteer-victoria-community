import { Button } from '@mui/material';
import React from 'react';
import store from 'store'
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';


export default function Authentication() {

  const handleCallback = (response: ReactFacebookLoginInfo) => {
    console.log(response)
    // store.set('auth', {authed: true})
  }
  return (
    <div >
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={true}
        fields="name,email,picture"
        icon="fa-facebook"
        callback={handleCallback} 
      />
    </div>
  )
}