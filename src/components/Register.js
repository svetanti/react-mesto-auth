import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import * as auth from '../utils/auth';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [inputType, setInputType] = useState('password');

  const emailRef = useRef();
  const passwordRef = useRef();

  const escape = require('escape-html')

  function handleChange(evt) {
    const { value } = evt.target;
    evt.target.name === 'email'
      ? setEmail(value)
      : setPassword(value);
    validate();
  }

  function validate() {
    setEmailError(emailRef.current.validationMessage);

    setPasswordError(passwordRef.current.validationMessage);

    !emailRef.current.validity.valid ? setEmailValid(false) : setEmailValid(true);
    !passwordRef.current.validity.valid
      ? setPasswordValid(false)
      : setPasswordValid(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    auth.register(escape(password), email)
      .then((res) => {
        if (res) {
          onRegister(res);
          return;
        }
      })
      .catch((err) => onRegister(err));
  }

  function handleShowPassword() {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  }

  return (
    <div className='entrance'>
      <Form formName='entrance'
        title='Регистрация'
        submitButtonText='Зарегистрироваться'
        isPopup={false}
        path='/sign-in'
        entranceText='Уже зарегистрированы?'
        entranceLinkText='Войти'
        onSubmit={handleSubmit}
      >
        <label htmlFor='email' className='form__field'>
          <input
            ref={emailRef}
            type='email'
            className='form__input form__input_type_entrance'
            id='email'
            name='email'
            value={email || ''}
            placeholder='Email'
            minLength='6'
            maxLength='40'
            required
            onChange={handleChange}
          />
          <span
            className={`form__input-error ${!emailValid && 'form__input-error_active'}`}
            id='email-error'
          >
            {emailError}
          </span>
        </label>
        <label htmlFor='password' className='form__field'>
          <input
            ref={passwordRef}
            type={inputType}
            className='form__input form__input_type_entrance'
            id='password'
            name='password'
            value={password || ''}
            placeholder='Пароль'
            minLength='6'
            maxLength='30'
            required
            onChange={handleChange}
          />
          <button className={`form__input_password form__input_password_${inputType}`} onClick={handleShowPassword}></button>
          <span
            className={`form__input-error ${!passwordValid && 'form__input-error_active'}`}
            id='password-error'
          >
            {passwordError}
          </span>
        </label>
      </Form>
    </div >
  );
}

export default withRouter(Register);
