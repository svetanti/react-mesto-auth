import React from 'react';
import { Link } from 'react-router-dom';

function Form(props) {
  const {
    formName,
    onSubmit,
    onClose,
    title,
    children,
    isLoading,
    disabled,
    submitButtonText,
    isPopup,
    path,
    entranceText,
    entranceLinkText,
    noConfirm,
  } = props;

  return (
    <form
      className={`form ${isPopup && 'form__modal'} form_type_${formName}`}
      name={formName}
      onSubmit={onSubmit}
    >
      {
        isPopup && (<button
          type='reset'
          className={
            `button button_close
            form__button
            form__button_close
            form__button_close_type_${formName}`
          }
          onClick={onClose} />)
      }
      <fieldset className={`form__input-container form__input-container_type_${formName}`}>
        <legend className='form__heading'>{title}</legend>
        {children}
      </fieldset>
      <div>
        {!noConfirm
          && (<button
            type='submit'
            className=
            {
              `button form__button form__button_submit form__button_submit_type_${formName}
              ${isLoading && 'form__button_submit_loading'}`
            }
            disabled={disabled}
          >{isLoading ? 'Сохранение...' : submitButtonText}
          </button>)
        }
        {
          !isPopup
          && (<span>{entranceText} <Link to={path} className='link'>{entranceLinkText}</Link></span>)
        }
      </div>
    </form>
  );
}

export default Form;
