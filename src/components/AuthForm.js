import React, { useState, useRef } from 'react';
import Form from './Form';

function AuthForm({ title, submitButtonText, path,
  entranceText, entranceLinkText, onSubmit, autoCompleteEmail, autoCompletePassword,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [inputType, setInputType] = useState('password');

  const emailRef = useRef();
  const passwordRef = useRef();

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
    if (!email && !password) return;
    onSubmit(password, email);
    setEmail('');
    setPassword('');
  }

  function handleShowPassword() {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  }

  return (
    <div className='entrance'>
      <Form formName='entrance'
        title={title}
        submitButtonText={submitButtonText}
        isPopup={false}
        path={path}
        entranceText={entranceText}
        entranceLinkText={entranceLinkText}
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
            autoComplete={autoCompleteEmail}
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
            autoComplete={autoCompletePassword}
            required
            onChange={handleChange}
          />
          <button
            type='button'
            className={`form__input_password form__input_password_${inputType} button`}
            onClick={handleShowPassword}
            onKeyDown={(evt) => evt.preventDefault}></button>
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

export default AuthForm;
