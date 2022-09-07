export default function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_theme_dark popup_img ${
        card.src && "popup_opened"
      }`}
    >
      <div className="popup__container-img">
        <img src={card.src} alt={card.name} className="popup__img" />
        <p className="popup__card-name"></p>
        <button
          type="button"
          className="popup__close-button popup__close-button_img"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

