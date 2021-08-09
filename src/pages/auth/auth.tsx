import React, { FC, FormEvent } from 'react'
import styles from './auth.module.css'
import { Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { login } from 'services/slices/authSlice'
import { useAppDispatch, useAppSelector } from 'services/hooks'
import CustomInput from 'components/input/input'
import { TLocationState } from 'types/types'

type TForm = {
  email: string
  password: string
}
const AuthPage: FC = () => {
  const [form, setForm] = React.useState<TForm>({ email: '', password: '' })
  const { isAuthorized } = useAppSelector((store) => store.auth)
  const location = useLocation<TLocationState>()

  const dispatch = useAppDispatch()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (form.email && form.password) {
      dispatch(login(form))
      setForm({ email: '', password: '' })
    }
  }
  // возвращаем на предыдущую страницу, когда залогинимся
  if (isAuthorized) {
    return <Redirect to={location.state?.from || '/'} />
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className={styles.heading}>Вход</h1>
        <CustomInput
          disabled={false}
          name='email'
          type='email'
          value={form.email}
          placeholder='E-mail'
          onChange={onChange}
        />
        <PasswordInput name='password' value={form.password} onChange={onChange} />
        <span className={styles.button}>
          <Button>Войти</Button>
        </span>
      </form>
      <p className={styles.text}>
        Вы — новый пользователь?&nbsp;
        <Link className={styles.link} to={'/register'}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={styles.text}>
        Забыли пароль?&nbsp;
        <Link className={styles.link} to={'/forgot-password'}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  )
}

export default AuthPage
