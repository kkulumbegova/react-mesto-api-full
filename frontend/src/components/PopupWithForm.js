export default function PopupWithForm({
  name,
  title,
  button,
  isOpen,
  onClose,
  children,
  onSubmit,
}) {
  return (
    <section className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h3 className="popup__header">{title}</h3>
        <form
          action="#"
          name={name}
          className="form form_add"
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" name="submit" className="form__submit">
            {button}
          </button>
        </form>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}
