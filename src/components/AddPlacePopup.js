import React, { useState, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, isLoading } = props;

  const titleRef = useRef();
  const linkRef = useRef();

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [titleError, setTitleError] = useState('');
  const [linkError, setLinkError] = useState('');
  const [titleValid, setTitleValid] = useState(false);
  const [linkValid, setLinkValid] = useState(false);
  const [disabled, setDisabled] = useState(true);

  React.useEffect(() => {
    setDisabled(true);
    setTitleError('');
    setLinkError('');
    setTitle('');
    setLink('');
  }, [isOpen]);

  React.useEffect(() => {
    titleValid && linkValid ? setDisabled(false) : setDisabled(true);
  }, [titleValid, linkValid, link]);

  function handleChange(evt) {
    evt.target.name === 'title'
      ? setTitle(evt.target.value)
      : setLink(evt.target.value);

    validate();
  }

  function validate() {
    setTitleError(titleRef.current.validationMessage);
    setLinkError(linkRef.current.validationMessage);

    !titleRef.current.validity.valid ? setTitleValid(false) : setTitleValid(true);
    !linkRef.current.validity.valid ? setLinkValid(false) : setLinkValid(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      title,
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
      <label htmlFor='title' className='form__field'>
        <input
          ref={titleRef}
          className='form__input'
          id='title'
          name='title'
          value={title || ''}
          placeholder='Название'
          minLength='1'
          maxLength='30'
          required
          onChange={handleChange}
        />
        <span
          className={`form__input-error ${!titleValid && 'form__input-error_active'
            }`}
          id='title-error'
        >
          {titleError}
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
          className={`form__input-error ${!linkValid && 'form__input-error_active'
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
