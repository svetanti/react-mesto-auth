import React from 'react';
import Form from './Form';

function PopupWithForm(props) {
  const {
    isOpen,
    onSubmit,
    onClose,
    formName,
    title,
    children,
    submitButtonText,
    disabled,
    isLoading,
    noConfirm
  } = props;

  return (
    <div className={`popup popup_type_${formName} ${isOpen && 'popup_opened'}`}>
      <Form
        isPopup={true}
        formName={formName}
        onSubmit={onSubmit}
        onClose={onClose}
        isLoading={isLoading}
        title={title}
        children={children}
        disabled={disabled}
        submitButtonText={submitButtonText}
        noConfirm={noConfirm}
      ></Form>

    </div>
  );
}

export default PopupWithForm;
