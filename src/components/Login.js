import React from 'react';
import AuthForm from './AuthForm';

function Login({ onLogin }) {

  function submitForm(password, email) {
    onLogin(password, email);
  }

  return (
    <AuthForm
      title='Вход'
      submitButtonText='Войти'
      path='/sign-up'
      entranceText='Ещё не зарегистрированы?'
      entranceLinkText='Регистрация'
      onSubmit={submitForm}
      autoCompleteEmail='email'
      autoCompletePassword='current-password'
    />
  )
}

export default Login;
