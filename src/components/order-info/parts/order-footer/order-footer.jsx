import Price from 'components/price/price'
import styles from './order-footer.module.css'
import PropTypes from 'prop-types';


const OrderFooter = ({ datetime, price }) => {
    return (
        <footer className={styles.footer}>
            <p className={styles.wrapper}>
                <time dateTime={datetime} className={styles.time}>Вчера, 17:41 i-GMT+5</time>
            </p>
            <Price size='medium'>{price}</Price>
        </footer>
    );
}

export default OrderFooter;

OrderFooter.propTypes = {
    datetime: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}