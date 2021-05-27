
import cardStyles from './card.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Card = ({ item }) => {

    return (
        <article className={cardStyles.item} key={item._id}>
            <Counter count={1} />
            <picture className={cardStyles.picture}>
                <source media="(max-width: 799px)" srcSet={item.image_mobile} />
                <source media="(min-width: 800px)" srcSet={item.image_large} />
                <img className={cardStyles.image} src={item.image} alt={item.name} />
            </picture>
            <span className={cardStyles.price}>{item.price}&nbsp;<CurrencyIcon type="primary" /></span>
            <p className={cardStyles.text}>{item.name}</p>
        </article>
    )
}
export default Card;