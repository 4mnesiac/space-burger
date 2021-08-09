import React, {FC} from 'react';
import cardStyles from './card.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from 'services/hooks'
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom'
import { TIngredient, TLocationState } from 'types/types';

interface ICard {
    item: TIngredient;
    onClick: (item: TIngredient) => void
}
const Card: FC<ICard>= ({ item, onClick }) => {
    const location = useLocation<TLocationState>()
    const { counts } = useAppSelector(store => store.cart)
    const [, dragRef] = useDrag({
        type: "ingredients",
        item: { item },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    return (
        <Link className={cardStyles.item} to={{
            pathname: `/ingredients/${item._id}`,
            state: { from: location.pathname, pushLocation: location }
        }}>
            <article className={cardStyles.card} key={item._id} onClick={() => onClick(item)} ref={dragRef}>
                {counts[item._id] > 0 && <Counter count={item.type === 'bun' ? counts[item._id] + 1 : counts[item._id]} />}
                <picture className={cardStyles.picture}>
                    <source media="(max-width: 767px)" srcSet={item.image_mobile} />
                    <source media="(min-width: 768px)" srcSet={item.image_large} />
                    <img className={cardStyles.image} src={item.image} alt={item.name} />
                </picture>
                <span className={cardStyles.price}>{item.price}&nbsp;<CurrencyIcon type="primary" /></span>
                <p className={cardStyles.text}>{item.name}</p>
            </article>
        </Link>
    )
}
export default Card;
