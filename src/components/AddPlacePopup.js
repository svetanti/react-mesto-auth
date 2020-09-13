import React, { useState, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, isLoading } = props;

  const nameRef = useRef();
  const linkRef = useRef();

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [nameError, setNameError] = useState('');
  const [linkError, setLinkError] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [linkValid, setLinkValid] = useState(false);
  const [disabled, setDisabled] = useState(true);

  React.useEffect(() => {
    setDisabled(true);
    setNameError('');
    setLinkError('');
    setName('');
    setLink('');
  }, [isOpen]);

  React.useEffect(() => {
    nameValid && linkValid ? setDisabled(false) : setDisabled(true);
  }, [nameValid, linkValid, name, link]);

  function handleChange(evt) {
    evt.target.name === 'name'
      ? setName(evt.target.value)
      : setLink(evt.target.value);

    validate();
  }

  function validate() {
    setNameError(nameRef.current.validationMessage);
    setLinkError(linkRef.current.validationMessage);

    !nameRef.current.validity.valid ? setNameValid(false) : setNameValid(true);
    !linkRef.current.validity.valid ? setLinkValid(false) : setLinkValid(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      formName='photo'
      title='Новое место'
      submitButtonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={disabled}
      isLoading={isLoading}
    >
      <label htmlFor='name' className='form__field'>
        <input
          ref={nameRef}
          className='form__input'
          id='name'
          name='name'
          value={name || ''}
          placeholder='Название'
          minLength='1'
          maxLength='30'
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
      <label htmlFor='link' className='form__field'>
        <input
          ref={linkRef}
          type='url'
          className='form__input'
          id='link'
          name='link'
          value={link || ''}
          placeholder='Ссылка на картинку'
          required
          onChange={handleChange}
        />
        <span
          className={`form__input-error ${
            !linkValid && 'form__input-error_active'
            }`}
          id='link-error'
        >
          {linkError}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
