import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoPath from '../images/header/logo.svg';
import AuthInfo from './AuthInfo';
import Hamburger from './ui/Hamburger';

function Header({
  loggedIn, email, signOut, isAuthInfoOpened, onHamburgerClick,
}) {
  const { pathname } = useLocation();
  const linkText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const linkPath = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

  return (
    <header className='header'>
      <img src={logoPath} alt='Логотип сайта' className='logo' />
      <h1 className='visually-hidden'>
        Место: интерактивный сервис для добавления фотографий
      </h1>
      {loggedIn
        ? (<>
          <AuthInfo email={email} signOut={signOut} />
          <Hamburger
            isAuthInfoOpened={isAuthInfoOpened}
            onHamburgerClick={onHamburgerClick} />
        </>)
        : (<Link to={linkPath} className="link header__link">{linkText}</Link>)
      }
    </header >
  );
}

export default Header;
