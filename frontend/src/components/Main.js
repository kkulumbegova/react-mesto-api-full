import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></div>
        <h1 className="profile__name">{currentUser.name}</h1>
        <button
          type="button"
          className="profile__edit-button"
          onClick={onEditProfile}
        ></button>
        <h2 className="profile__description">{currentUser.about}</h2>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              name={card.name}
              likes={card.likes}
              id={card.id}
              owner={card.owner}
              key={card.id}
              src={card.src}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            ></Card>
          ))}
        </ul>
      </section>
    </div>
  );
}