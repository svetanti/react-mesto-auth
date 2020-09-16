import React, { useState } from 'react';
import {
  Route, Switch, useLocation, Redirect, useHistory,
} from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';
import { api } from '../utils/Api';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import AuthInfoMobile from './AuthInfoMobile';
import resolvePath from '../images/infoTooltip/resolve.svg';
import rejectPath from '../images/infoTooltip/reject.svg';
import loader from '../images/infoTooltip/loader.svg';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    link: '',
    name: '',
  });
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoading, setLoading] = useState();
  const [isAuthInfoOpened, setAuthInfoOpened] = useState(false);
  const [message, setMessage] = useState({
    iconPath: loader,
    text: ''
  });

  const location = useLocation();
  const history = useHistory();
  const escape = require('escape-html');

  // Получить данные пользователя
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка при загрузке информации о пользователе: ${err}`));
  }, []);

  // Проверить токен
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch(err => console.log(err));
    }
  }, [history]);

  // Регистрация
  function handleRegister(password, email) {
    auth.register(escape(password), email)
      .then(() => {
        setMessage({ iconPath: resolvePath, text: 'Вы успешно зарегистрировались!' });
      })
      .catch((err) => setMessage({ iconPath: rejectPath, text: err.message }));
    setInfoTooltipOpen(true);
  }

  // Авторизация
  function handleLogin(password, email) {
    auth.authorize(escape(password), email)
      .then((data) => {
        auth.getContent(data)
          .then((res) => {
            setEmail(res.data.email);
          })
          .catch(err => console.log(err));
        setLoggedIn(true);
        setMessage({ iconPath: resolvePath, text: 'Вы успешно вошли в приложение!' });
        history.push('/');
      })
      .catch((err) => setMessage({ iconPath: rejectPath, text: err.message }))
    setInfoTooltipOpen(true);
  }

  // Выход
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail('');
    history.push('/sign-in');
  }

  // Получить карточки
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(`Ошибка при загрузке карточек: ${err}`));
  }, []);

  // Лайк/дизлайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(`Ошибка при попытке поставить/снять лайк: ${err}`));
  }

  // Удалить карточку после подтверждения
  function handleConfirm() {
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards(cards.filter((item) => item !== cardToDelete));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
  }

  // Кликнуть на удаление карточки
  function handleCardDelete(card) {
    setConfirmPopupOpen(true);
    setCardToDelete(card);
  }

  // Открыть AvatarPopup
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  // Открыть EditProfilePopup
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  // Открыть AddPlacePopup
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  // Открыть увеличенное фото
  function handleCardClick(card) {
    const { link, name } = card;
    setSelectedCard({ isImageOpen: true, link, name });
  }

  // Закрыть все попапы
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({
      isImageOpen: false,
      link: '',
      name: '',
    });
    setConfirmPopupOpen(false);
    setInfoTooltipOpen(false);
    setMessage({
      iconPath: loader,
      text: ''
    });
  }

  // Обновить аватар
  function handleUpdateAvatar(newAvatar) {
    setLoading(true);
    api
      .updateUserAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка при обновлении аватара: ${err}`))
      .finally(() => setLoading(false));
  }

  // Обновить данные пользователя
  function handleUpdateUser(userData) {
    setLoading(true);
    api
      .updateUserInfo(userData)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => `Ошибка при обновлении информации о пользователе: ${err}`)
      .finally(() => setLoading(false));
  }

  // Добавить карточку
  function handleAddPlace(card) {
    setLoading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка при добавлении новой карточки: ${err}`))
      .finally(() => setLoading(false));
  }

  // Открыть/закрыть email пользователя в мобильной версии
  function openAuthInfo() {
    setAuthInfoOpened(!isAuthInfoOpened);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {(loggedIn && isAuthInfoOpened)
          && (<AuthInfoMobile
            email={email}
            signOut={handleSignOut}
            isAuthInfoOpened={isAuthInfoOpened} />)}
        <Header
          loggedIn={loggedIn}
          locaction={location}
          email={email}
          signOut={handleSignOut}
          isAuthInfoOpened={isAuthInfoOpened}
          onHamburgerClick={openAuthInfo} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
          />
          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          loggedIn={loggedIn}
          message={message}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleConfirm}
        />
        <ImagePopup
          name={selectedCard.name}
          link={selectedCard.link}
          onClose={closeAllPopups}
          isOpen={selectedCard.isImageOpen}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
