import s from './profile-nav.module.css'
import { NavLink, useHistory } from 'react-router-dom'
import { useAppDispatch } from 'services/hooks'
import { logout } from 'services/slices/authSlice'
import { FC } from 'react'

interface IProfileNav {
  text: string
}

const ProfileNav: FC<IProfileNav> = ({ text }) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const onClick = async () => {
    await dispatch(logout())
    history.replace({ pathname: '/login' })
  }

  return (
    <div className={s.navmenu}>
      <ul className={s.menu}>
        <li className={s.menu_item}>
          <NavLink to={'/profile'} exact className={s.link} activeClassName={s.active}>
            Профиль
          </NavLink>
        </li>
        <li className={s.menu_item}>
          <NavLink to={{ pathname: `/profile/orders` }} exact className={s.link} activeClassName={s.active}>
            История заказов
          </NavLink>
        </li>
        <li className={s.menu_item}>
          <NavLink to={{ pathname: '/login' }} exact className={s.link} activeClassName={s.active} onClick={onClick}>
            Выход
          </NavLink>
        </li>
      </ul>
      <p className={s.text}>{text}</p>
    </div>
  )
}

export default ProfileNav
