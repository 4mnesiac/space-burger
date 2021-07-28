import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './profile-form.module.css'
import { useCallback } from 'react';
import CustomInput from 'components/input/input';
import { updateUser } from 'services/slices/authSlice';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const ProfileForm = () => {
    const { name, email } = useSelector(store => store.auth.user)
    const [form, setForm] = useState({ name: name, email: email, password: '' })
    const [isEdited, setEdited] = useState(false)
    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (!isEdited) { setEdited(true) }
    };
    const dispatch = useDispatch();

    const onSubmit = useCallback((e) => {
        e.preventDefault()
        if (form.name && form.email) {
            dispatch(updateUser(form))
            setEdited(false)
        }
    }, [dispatch, form]);

    const onCancel = useCallback((e) => {
        e.preventDefault();
        setForm({
            name: name,
            email: email,
            password: ''
        }
        );
        setEdited(false);
    }, [name, email]);

    return (
        <form className={s.user_info} onSubmit={onSubmit}>
            <CustomInput icon={'EditIcon'} name="name" type="text" value={form.name} placeholder="Имя" onChange={onChange} />
            <CustomInput icon={'EditIcon'} name="email" type="email" value={form.email} placeholder="Логин" onChange={onChange} />
            <CustomInput icon={'EditIcon'} name="password" type="password" value={form.password} placeholder="Пароль" onChange={onChange} />
            {isEdited && (
                <span className={s.button}>
                    <Button>Сохранить</Button>
                    <Button onClick={onCancel} size='medium' type='secondary'>Отмена</Button>
                </span>
            )}
        </form>
    );
}

export default ProfileForm;