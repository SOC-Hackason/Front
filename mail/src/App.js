import React from 'react';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginButton() {
  const login = useGoogleLogin({
    onSuccess: codeResponse => fetch('http://localhost:8000/gmail/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: codeResponse.code }),
    }),
    flow: 'auth-code',
    scope: "https://mail.google.com/"
  });

  return <button onClick={login}>Login with Google</button>;
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <LoginButton />
    </GoogleOAuthProvider>
  );
}

export default App;