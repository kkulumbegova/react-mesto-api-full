import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext } from "react";

export default function Card({
  name,
  likes,
  id,
  src,
  owner,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  function handleClick() {
    onCardClick({ name, likes, id, src });
  }
  function handleLikeClick() {
    onCardLike({ name, likes, id, src, owner });
  }
  function handleDeleteClick() {
   
    onCardDelete({ name, likes, id, src, owner });
  }
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete_visible" : "card__delete_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some((el) => el === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  return (
    <li className="card" key={id}>
      <img
        src={src}
        alt="Изображение"
        className="card__img"
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__name">{name}</h2>
        <div>
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__likecounter">{likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}


