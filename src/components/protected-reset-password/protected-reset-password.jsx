import PropTypes from "prop-types";
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRouteWithReset({ children, ...rest }) {
    const { name } = useSelector(store => store.auth.user)
    const emailConfirmationSended = localStorage.getItem('emailConfirmationSended')

    return (
        <Route {...rest}
            render={() =>
                !name && emailConfirmationSended === 'true' ? (
                    children
                ) : (
                    <Redirect to={{ pathname: '/' }} />
                )
            }
        />
    )
}
ProtectedRouteWithReset.propTypes = {
  children: PropTypes.element
}
