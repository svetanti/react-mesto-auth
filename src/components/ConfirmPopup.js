import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {
  const { isOpen, onClose, onConfirmDelete, isLoading } = props;

  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirmDelete();
  }

  return (
    <PopupWithForm
      formName='delete'
      title='Вы уверены?'
      submitButtonText='Да'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    ></PopupWithForm>
  );
}

export default ConfirmPopup;
