import styles from './price.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Price = ({ children, iconType, size = 'default' }) => {
    return (
        <span className={`${styles.price} ${size === 'default' ? styles.default : styles.medium}`}>
            {children}
            <CurrencyIcon type={iconType} />
        </span>
    );
}

export default Price;

Price.propTypes = {
    children: PropTypes.number.isRequired,
    iconType: PropTypes.string,
    size: PropTypes.string
}