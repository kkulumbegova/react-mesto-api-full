import React, { useState } from "react";
export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className="login">
      <h3 className="login__header">Вход</h3>
      <form action="#" name="place" className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="name"
          className="form__input form__input_login"
          minLength="2"
          maxLength="30"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <span id="email-error" className="form__input-error"></span>
        <input
          type="password"
          id="password"
          name="password"
          className="form__input form__input_login"
          placeholder="Пароль"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <span id="password-error" className="form__input-error"></span>
        <button
          type="submit"
          name="submit"
          className="form__submit form__submit_login"
        >
          Войти
        </button>
      </form>
    </section>
  );
}
