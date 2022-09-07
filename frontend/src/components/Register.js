import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email, password });
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className="register">
      <h3 className="register__header">Регистрация</h3>
      <form action="#" name="place" className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="name"
          className="form__input form__input_register"
          minLength="2"
          maxLength="30"
          placeholder="Email"
          required
          value={email || ""}
          onChange={handleEmailChange}
        />
        <span id="email-error" className="form__input-error"></span>
        <input
          type="password"
          id="password"
          name="password"
          className="form__input form__input_register"
          placeholder="Пароль"
          required
          value={password || ""}
          onChange={handlePasswordChange}
        />
        <span id="password-error" className="form__input-error"></span>
        <button
          type="submit"
          name="submit"
          className="form__submit form__submit_register"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="register__link">
        <Link to="sign-in" className="login__link login__link_footer">
          Уже зарегистрированы? Войти
        </Link>
      </p>
    </section>
  );
}