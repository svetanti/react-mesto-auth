import React, { useState, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser, isLoading } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const nameRef = useRef();
  const descriptionRef = useRef();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [disabled, setDisabled] = useState(true);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  React.useEffect(() => {
    setDisabled(true);
    setNameError('');
    setDescriptionError('');
  }, [isOpen]);

  React.useEffect(() => {
    nameValid && descriptionValid ? setDisabled(false) : setDisabled(true);
  }, [nameValid, descriptionValid, name, description]);

  function handleChange(evt) {
    evt.target.name === 'name'
      ? setName(evt.target.value)
      : setDescription(evt.target.value);

    validate();
  }

  function validate() {
    setNameError(nameRef.current.validationMessage);
    setDescriptionError(descriptionRef.current.validationMessage);

    !nameRef.current.validity.valid ? setNameValid(false) : setNameValid(true);
    !descriptionRef.current.validity.valid
      ? setDescriptionValid(false)
      : setDescriptionValid(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      formName='user'
      title='Редактировать профиль'
      submitButtonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={disabled}
      isLoading={isLoading}
    >
      <label htmlFor='name' className='form__field'>
        <input
          ref={nameRef}
          type='text'
          className='form__input'
          id='name'
          name='name'
          value={name || ''}
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          pattern='[А-Яа-яA-Za-z -]{1,}'
          required
          onChange={handleChange}
        />
        <span
          className={`form__input-error ${
            !nameValid && 'form__input-error_active'
            }`}
          id='name-error'
        >
          {nameError}
        </span>
      </label>
      <label htmlFor='about' className='form__field'>
        <input
          ref={descriptionRef}
          type='text'
          className='form__input'
          id='about'
          name='about'
          value={description || ''}
          placeholder='О себе'
          minLength='2'
          maxLength='200'
          required
          onChange={handleChange}
        />
        <span
          className={`form__input-error ${
            !descriptionValid && 'form__input-error_active'
            }`}
          id='about-error'
        >
          {descriptionError}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
