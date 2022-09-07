import { Route } from 'react-router-dom';
import React from 'react';

export default function Footer() {
  return (
    <Route exact path='/'>
      <footer className="footer">
        <p className="footer__logo">
          &copy; 2022 Mesto Russia
        </p>
      </footer>
    </Route>
  )
}