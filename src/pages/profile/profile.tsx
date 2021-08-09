import React, { FC } from 'react'
import s from './profile.module.css'
import { useAppSelector } from 'services/hooks'
import { useLocation, Redirect } from 'react-router-dom'
import ProfileNav from 'components/profile-nav/profile-nav'
import ProfileForm from 'components/profile-form/profile-form'
import { TLocationState } from 'types/types'

const Profile: FC = () => {
  const { isAuthorized } = useAppSelector((store) => store.auth)
  const location = useLocation<TLocationState>()

  if (!isAuthorized) {
    const { from } = location.state || { from: { pathname: '/login' } }
    return <Redirect to={from} />
  }

  return (
    <section className={s.wrapper}>
      <ProfileNav text='В этом разделе вы можете изменить свои персональные данные' />
      <ProfileForm />
    </section>
  )
}

export default Profile;
