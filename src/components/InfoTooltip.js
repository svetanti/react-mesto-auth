import React from 'react';
import PopupWithForm from './PopupWithForm';

function InfoTooltip(props) {
  const { isOpen, onClose, loggedIn, message } = props;

  return (
    <PopupWithForm
      formName='infoTooltip'
      noConfirm={true}
      isOpen={isOpen}
      onClose={onClose}
      loggedIn={loggedIn}
    >
      <img src={message.iconPath} alt='Иконка успешной авторизации' className='form__icon' />
      <p className='form__text'>{message.text}</p>

    </PopupWithForm >
  );
}

export default InfoTooltip;
