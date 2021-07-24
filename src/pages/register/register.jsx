import React from 'react';
import styles from './register.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'services/slices/authSlice';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import LoaderSpinner from 'components/loader/loader';

const RegisterPage = () => {
    const { isAuthorized, hasError, isLoading } = useSelector(store => store.auth)
    const location = useLocation();
    const history = useHistory()

    const [isVisible, setVisible] = React.useState(false)
    const [form, setForm] = React.useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = async e => {
        e.preventDefault();
        await dispatch(register(form))
        setForm({ name: '', email: '', password: '' })
        return history.replace('/login');
    }
    if (isAuthorized) {
        console.log('in name ', location.state)
        const { from } = location.state || { from: { pathname: '/' } }
        return (
            <Redirect to={from} />
        )
    }
    return (
        <>
        {isLoading && <LoaderSpinner/>}
        {!isLoading && !hasError (
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
        )}
    </>
    );
}

export default RegisterPage;