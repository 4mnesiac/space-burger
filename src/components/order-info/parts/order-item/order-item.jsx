import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-item.module.css'
import PropTypes from 'prop-types';

const OrderItem = ({ ingredient, price }) => {
    return (
        <article className={styles.ingredient}>
            <div className={styles.ingredient}>
                <picture className={styles.picture}>
                    <img src={ingredient.image} alt={ingredient.name} />
                </picture>
            </div>
            <h4 className={styles.ingredient_name}>{ingredient.name}</h4>
            <span className={styles.price}>{2}&nbsp;x&nbsp;{price}<CurrencyIcon /></span>
        </article>
    );
}

export default OrderItem;

OrderItem.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  price: PropTypes.number.isRequired
}