import Price from 'components/price/price'
import styles from './order-footer.module.css'
import PropTypes from 'prop-types';


const OrderFooter = ({ datetime, price }) => {
    return (
        <footer className={styles.footer}>
            <p className={styles.wrapper}>
                <time dateTime={datetime} className={styles.time}>{datetime}</time>
            </p>
            <Price>{price}</Price>
        </footer>
    );
}

export default OrderFooter;

OrderFooter.propTypes = {
    datetime: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}