const renderLoading = (isLoading, popupSelector) => {
    if(isLoading) {
      document.querySelector(popupSelector).querySelector('.form__submit').textContent = 'Сохранение...'
    } else {
      document.querySelector(popupSelector).querySelector('.form__submit').textContent = 'Сохранить'
    }
  }

  export default renderLoading;