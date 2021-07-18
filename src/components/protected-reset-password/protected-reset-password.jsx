import PropTypes from "prop-types";
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRouteWithReset({ children, ...rest }) {
    const { isAuthorized } = useSelector(store => store.auth)
    const emailConfirmationSended = localStorage.getItem('emailConfirmationSended')

    return (
        <Route {...rest}
            render={(location) =>
                !isAuthorized && emailConfirmationSended === 'true' ? (
                    children
                ) : (
                    <Redirect to={{ pathname: location.state?.from.pathname }} />
                )
            }
        />
    )
}
ProtectedRouteWithReset.propTypes = {
    children: PropTypes.element
}
