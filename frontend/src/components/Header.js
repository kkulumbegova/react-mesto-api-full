import React from "react";
import logo from "../img/logo.svg";
import { Link, Route, Switch } from "react-router-dom";

export default function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__login">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__register">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__info">
            <p className="header__userInfo">{email}</p>
            <p className="header__signOut" onClick={onSignOut}>
              Выйти
            </p>
          </div>
        </Route>
      </Switch>
    </header>
  );
}