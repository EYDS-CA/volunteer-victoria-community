import { Button } from '@mui/material';
import React from 'react';
import store from 'store'


export default function Authentication() {

  const testAuth = () => {
    store.set('auth', {authed: true})
  }
  return (
    <div >hello
      <Button variant="contained" onClick={testAuth}>Test auth</Button>
    </div>
  )
}