import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const userInfo = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(userInfo.name);
        setDescription(userInfo.about);
    }, [userInfo, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(
            {
                name: name,
                about: description,
            });
    }

    return (
        <PopupWithForm name='edit' title='Редактировать профиль' button='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input
                type="text"
                id="name"
                name="name"
                className="form__input form__input_type_name"
                minLength="2"
                maxLength="40"
                placeholder="Имя"
                required
                value={name || ''}
                onChange={handleNameChange}
            />
            <span id="name-error" className="form__input-error"></span>

            <input
                type="text"
                id="job"
                name="job"
                className="form__input form__input_type_job"
                minLength="2"
                maxLength="200"
                placeholder="Род занятий"
                required
                value={description || ''}
                onChange={handleDescriptionChange}
            />
            <span id="job-error" className="form__input-error"></span>
        </PopupWithForm>)
}