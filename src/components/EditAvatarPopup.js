import React, { useState, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar, isLoading } = props;
  const inputRef = useRef('');

  const [urlError, setUrlError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [urlValid, setUrlValid] = useState(false);

  React.useEffect(() => {
    setDisabled(true);
    setUrlError('');
    inputRef.current.value = '';
  }, [isOpen]);

  React.useEffect(() => {
    urlValid ? setDisabled(false) : setDisabled(true);
  }, [urlValid, inputRef.current.value]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ url: inputRef.current.value });
  }

  function validate() {
    setUrlError(inputRef.current.validationMessage);

    !inputRef.current.validity.valid ? setUrlValid(false) : setUrlValid(true);
  }

  return (
    <PopupWithForm
      formName='avatar'
      title='Обновить аватар'
      submitButtonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={disabled}
      isLoading={isLoading}
    >
      <label htmlFor='url' className='form__field'>
        <input
          ref={inputRef}
          type='url'
          className='form__input'
          id='url'
          name='url'
          placeholder='Ссылка на аватар'
          required
          onChange={validate}
        />
        <span
          className={`form__input-error ${
            !urlValid && 'form__input-error_active'
            }`}
          id='url-error'
        >
          {urlError}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
