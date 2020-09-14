import React from 'react';

function AuthInfoMobile({ email, signOut, isAuthInfoOpened }) {
  const authInfoMobileClassNAme =
    `auth-info__mobile
    ${isAuthInfoOpened
      ? 'auth-info__mobile_opened'
      : 'auth-info__mobile_closed'}`;
  return (
    <div className={authInfoMobileClassNAme}>
      <span>{email}</span>
      <button className='auth-info__signout' onClick={signOut}>Выйти</button>
    </div>
  );
}

export default AuthInfoMobile;
