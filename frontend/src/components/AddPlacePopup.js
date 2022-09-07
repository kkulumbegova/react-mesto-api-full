import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [place, setPlace] = useState('');
    const [link, setPlaceLink] = useState('');
    useEffect(() => {
        setPlace('');
        setPlaceLink('');
    }, [isOpen])

    function handlePlaceChange(e) {
        return setPlace(e.target.value);
    }

    function handlePlaceLinkChange(e) {
        return setPlaceLink(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(
            {
                name: place,
                link: link,
            });
    }
    return (
        <PopupWithForm name='add' title='Добавить новое место' button='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input
                type="text"
                id="name-card"
                name="name"
                className="form__input form__input_type_card-name"
                minLength="2"
                maxLength="30"
                placeholder="Название"
                required
                value={place}
                onChange={handlePlaceChange}
            />
            <span id="name-card-error" className="form__input-error"></span>
            <input
                type="url"
                id="link"
                name="link"
                className="form__input form__input_type_link"
                placeholder="Ссылка на картинку"
                required
                value={link}
                onChange={handlePlaceLinkChange}
            />
            <span id="link-error" className="form__input-error"></span>
        </PopupWithForm>
    )
}

