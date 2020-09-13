import React from 'react';

function AuthInfo({ email, signOut }) {
  return (
    <div className='auth-info'>
      <span>{email}</span>
      <button className='auth-info__signout' onClick={signOut}>Выйти</button>
    </div>
  );
}

export default AuthInfo;
