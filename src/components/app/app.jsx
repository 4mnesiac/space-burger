import React, { useCallback } from 'react';
import {IngredientPage, ProfileOrders, HomePage, AuthPage, RegisterPage, ForgotPassword, ResetPassword,Profile, NotFound404} from '../../pages';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import AppHeader from 'components/app-header/app-header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/slices/authSlice';
import { ProtectedRouteWithReset } from 'components/protected-reset-password/protected-reset-password';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from 'components/modal/modal';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import { getIngredients } from 'services/slices/ingredientsSlice';
import FeedPage from 'components/feed/feed';
import OrderInfo from 'components/order-info/order-info';
import ProtectedAuthorizedRoute from 'components/protected-authorized-route/protected-authorized-route';
import LoaderSpinner from 'components/loader/loader';
import { mockFeed, mockOrders } from '../../utils/data';


export const API = 'https://norma.nomoreparties.space/api';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const {isLoading} = useSelector(store => store.auth)

  let pushLocation = history.action === 'PUSH' && location.state && location.state.pushLocation;

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(getUser())
  }, [dispatch])
  
  const closeModal = useCallback(() => {
    history.goBack();
  }, [history]);


  return (
    <>
      {isLoading && <LoaderSpinner/>} 
      <AppHeader />
      <Switch location={pushLocation || location}>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path='/feed' exact={true}>
          <FeedPage feedData={mockFeed} orderData={mockOrders}/>
        </Route>
        <Route path='/feed/:id' exact={true}>
          <OrderInfo orderData={mockFeed[0]}/>
        </Route>

        <ProtectedAuthorizedRoute path="/login" exact>
          <AuthPage />
        </ProtectedAuthorizedRoute>
        <ProtectedAuthorizedRoute path="/register" exact>
          <RegisterPage />
        </ProtectedAuthorizedRoute>
        <ProtectedAuthorizedRoute path="/forgot-password" exact>
          <ForgotPassword />
        </ProtectedAuthorizedRoute>

        <ProtectedRouteWithReset path="/reset-password" exact>
          <ResetPassword />
        </ProtectedRouteWithReset>

        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <ProfileOrders />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderInfo orderData={mockFeed[1]}/>
        </ProtectedRoute>

        <Route path='/ingredients/:id' exact>
          <IngredientPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {pushLocation && (
        <Route path='/ingredients/:id' >
          <Modal name="Details" title='Детали ингредиента' onClose={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;
