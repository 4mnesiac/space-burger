import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

// роут закрыт для авторизованных пользователей
export default function ProtectedAuthorizedRoute({ children, ...rest }) {
  const { isAuthorized } = useSelector(store => store.auth);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } }

  return (
    <Route
      {...rest}
      render={() => {
        return !isAuthorized ? (
          children
        ) : (
          <Redirect to={from} />
        )
      }
      }
    />
  );
}

ProtectedAuthorizedRoute.propTypes = {
  children: PropTypes.element
}
