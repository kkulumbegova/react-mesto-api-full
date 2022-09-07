
class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Ошибка')
  }
  //информация о пользователе
  getInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(this._handleResponse);
  }
  //получение массива с карточками
  getItems() {
    return fetch(`${this.baseUrl}/cards`, {
      credentials: 'include',
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then(this._handleResponse);
  }
  //ожидание исполнения двух промисов - с данными о пользователе и карточками
  getAllNeededData() {
    return Promise.all([this.getInfo(), this.getItems()]);
  }
  //редактирование профиля
  editProfile(formData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: formData.name,
        about: formData.about,
      })
    })
    .then(this._handleResponse);
  }
  addCard(formData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: formData.name,
        link: formData.link,
      })
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then(this._handleResponse);
  }
  addLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then(this._handleResponse);
  }

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then(this._handleResponse);
  }

  changeLikeStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id)
    } else {
      return this.deleteLike(id)
    }
  }

  changeAvatar(formData) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar: formData.avatar,
      })
    })
    .then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: 'https://kulumbegova.nomoredomains.sbs',
})

export default api;