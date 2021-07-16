import React from 'react';
import styles from './register.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { register } from 'services/slices/authSlice';

const RegisterPage = () => {
    const [isVisible, setVisible] = React.useState(false)
    const [form, setForm] = React.useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = e => {
        e.preventDefault();
        dispatch(register(form))
        setForm({ name: '', email: '', password: '' })
    }


    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.heading}>Регистрация</h1>
                <Input
                    type="text"
                    placeholder="Имя"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                />

                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                />

                <Input
                    type={isVisible ? 'text' : "password"}
                    placeholder="Пароль"
                    name="password"
                    icon={isVisible ? 'ShowIcon' : 'HideIcon'}
                    value={form.password}
                    onChange={onChange}
                    onIconClick={() => setVisible(!isVisible)}
                />

                <span className={styles.button}>
                    <Button>Зарегистрироваться</Button>
                </span>
            </form>
            <p className={styles.text}>
                Уже зарегистрированы?&nbsp;
                <Link className={styles.link} to={'/login'}>
                    Войти
                </Link>
            </p>
        </div>

    );
}

export default RegisterPage;