export default function InfoToolTip({ isOpen, onClose, isRegister, message }) {
  return (
    <section className={`popup popup_tip ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <div
          className={`popup__info-img ${
            isRegister ? "popup__info-img_ok" : "popup__info-img_err"
          }`}
        ></div>
        <p className="popup__tip">{message}</p>
        <button
          type="button"
          className="popup__close-button popup__close-button_img"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}