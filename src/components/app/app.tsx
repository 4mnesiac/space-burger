import React, { FC, useCallback } from 'react'
import {
  IngredientPage,
  ProfileOrders,
  HomePage,
  AuthPage,
  RegisterPage,
  ForgotPassword,
  ResetPassword,
  Profile,
  NotFound404,
} from '../../pages'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import AppHeader from 'components/app-header/app-header'
import { useEffect } from 'react'
import { getUser } from '../../services/slices/authSlice'
import ProtectedRouteWithReset from 'components/protected-reset-password/protected-reset-password'
import ProtectedRoute from '../protected-route/protected-route'
import Modal from 'components/modal/modal'
import IngredientDetails from 'components/ingredient-details/ingredient-details'
import { getIngredients, resetIngredientToShow } from 'services/slices/ingredientsSlice'
import FeedPage from 'components/feed/feed'
import OrderInfo from 'components/order-info/order-info'
import ProtectedAuthorizedRoute from 'components/protected-authorized-route/protected-authorized-route'
import LoaderSpinner from 'components/loader/loader'
import { closeDetailsModal } from 'services/slices/modalSlice'
import OrderItemDetails from 'components/order-item-details/order-item-details'
import { useAppSelector, useAppDispatch } from '../../services/hooks'
import { TLocationState } from 'types/types'

export const API = 'https://norma.nomoreparties.space/api'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation<TLocationState>()
  const history = useHistory()
  const { isLoading } = useAppSelector((store) => store.auth)

  const isPush = history.action === 'PUSH'
  let pushLocation = isPush && location.state && location.state.pushLocation

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(getUser())
  }, [dispatch])

  const closeModal = useCallback(() => {
    dispatch(closeDetailsModal())
    history.goBack()
    dispatch(resetIngredientToShow())
    // dispatch(resetOrderToShow())
  }, [dispatch, history])

  return (
    <>
      {isLoading && <LoaderSpinner type='default' />}
      <AppHeader />
      <Switch location={pushLocation || location}>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/feed' exact>
          <FeedPage />
        </Route>
        <Route path='/feed/:id' exact>
          <OrderInfo />
        </Route>

        <ProtectedAuthorizedRoute path='/login' exact>
          <AuthPage />
        </ProtectedAuthorizedRoute>
        <ProtectedAuthorizedRoute path='/register' exact>
          <RegisterPage />
        </ProtectedAuthorizedRoute>
        <ProtectedAuthorizedRoute path='/forgot-password' exact>
          <ForgotPassword />
        </ProtectedAuthorizedRoute>

        <ProtectedRouteWithReset path='/reset-password' exact>
          <ResetPassword />
        </ProtectedRouteWithReset>

        <ProtectedRoute path='/profile' exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders' exact>
          <ProfileOrders />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders/:id' exact>
          <OrderInfo />
        </ProtectedRoute>

        <Route path='/ingredients/:id' exact>
          <IngredientPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {pushLocation && (
        <Route path='/ingredients/:id'>
          <Modal name='Details' title='Детали ингредиента' onClose={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {pushLocation && (
        <Route path='/feed/:id'>
          <OrderItemDetails onClose={closeModal} />
        </Route>
      )}
      {pushLocation && (
        <Route path='/profile/orders/:id'>
          <OrderItemDetails onClose={closeModal} />
        </Route>
      )}
    </>
  )
}

export default App
