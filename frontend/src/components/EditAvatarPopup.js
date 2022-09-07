import { createRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = createRef();

  const [avatarLink, setAvatarLink] = useState("");
  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleClick() {
    setAvatarLink(avatarRef.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarLink,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar_link"
        name="avatar_link"
        className="form__input form__input_type_link"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
        onChange={handleClick}
      />
      <span id="avatar_link-error" className="form__input-error"></span>
    </PopupWithForm>
  );
}