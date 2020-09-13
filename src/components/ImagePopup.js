import React from 'react';

function ImagePopup(props) {
  const { isOpen, onClose, link, name } = props;

  return (
    <div className={`popup photo ${isOpen && 'popup_opened'}`}>
      <figure className='photo__figure'>
        <button
          type='reset'
          className='photo__close button button_close'
          onClick={onClose}
        ></button>
        <img className='photo__img' src={link} alt={name} />
        <figcaption className='photo__caption'>{name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
