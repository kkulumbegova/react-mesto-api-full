import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import * as auth from "../Auth.js";
import InfoToolTip from "./InfoToolTip.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    likes: "",
    id: "",
    src: "",
  });
  const [isInfoToolTipOpen, setInfoToolTip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isRegister, setRegister] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    if(loggedIn) {
    api
      .getInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }}, [loggedIn]);

  useEffect(() => {
    if(loggedIn) { 
    api
      .getItems()
      .then((res) => {
        setCards(
          res.map((item) => ({
            name: item.name,
            likes: item.likes,
            id: item._id,
            src: item.link,
            owner: item.owner,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }}, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((el) => {
      return el === currentUser._id;
    });
    api
      .changeLikeStatus(card.id, !isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) =>
            c.id === card.id
              ? {
                  name: newCard.name,
                  likes: newCard.likes,
                  id: newCard._id,
                  src: newCard.link,
                  owner: newCard.owner,
                }
              : c
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleDeleteCard(card) {
    api
      .deleteCard(card.id)
      .then(() => {
        setCards((state) => {
          return state.filter((el) => el.id !== card.id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEditAvatarClick = () => {
    setEditAvatarState(true);
  };

  const handleEditProfileClick = () => {
    setEditProfileState(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlaceState(true);
  };

  const closeAllPopups = () => {
    setEditAvatarState(false);
    setEditProfileState(false);
    setAddPlaceState(false);
    setSelectedCard({ name: "", likes: "", id: "", src: "" });
    setInfoToolTip(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleUpdateUser = (formData) => {
    api
      .editProfile(formData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (formData) => {
    api
      .changeAvatar(formData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (formData) => {
    api
      .addCard(formData)
      .then((res) => {
        const newCard = {
          name: res.name,
          likes: res.likes,
          id: res._id,
          src: res.link,
          owner: res.owner,
        };
        setCards([newCard,...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tokenCheck = (token) => {
    const content = auth.getContent(token).then((res) => {
      if (res) {
        setCurrentUser(res);
        const { email } = res;
        setLoggedIn(true);
        setEmail(email);
      }
    });
    return content;
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenCheck(token);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  const onRegister = ({ email, password }) => {
    auth
      .register(email, password)
      .then((res) => {
        return res;
      })
      .then(() => {
        setInfoToolTip(true);
        setRegister(true);
        setMessage("Вы успешно зарегистрировались!");
        history.push("/sign-in");
      })
      .catch(() => {
        setInfoToolTip(true);
        setRegister(false);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
      });
  };

  const onLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch(() => {
        setInfoToolTip(true);
        setRegister(false);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
      });
  };

  const onSignOut = () => {
      localStorage.removeItem("token");
      setLoggedIn(false);
      setCurrentUser({});
      history.push("/sign-in");
    };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
            loggedIn={loggedIn}
          />
          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      ></EditProfilePopup>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      ></AddPlacePopup>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoToolTip
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        isRegister={isRegister}
        message={message}
      ></InfoToolTip>
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        button="Да"
      ></PopupWithForm>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      ></EditAvatarPopup>
    </CurrentUserContext.Provider>
  );
}

export default App;
