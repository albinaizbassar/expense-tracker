import React from 'react';

function Login(props) {
  const {
    setUser
  } = props
  return (
    <div>
      <button onClick={() => setUser([])}>
        Login
      </button>
    </div>
  );
}

export default Login;
