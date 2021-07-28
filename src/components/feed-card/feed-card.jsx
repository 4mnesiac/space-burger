import React, { useState } from 'react';
import styles from './feed-card.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import Price from 'components/price/price';
import PropTypes from 'prop-types';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openDetailsModal } from 'services/slices/modalSlice';
import { formatOrderDate } from 'utils/formatDate';
import { formatData } from 'utils/formatData';
import { setOrderToShow } from 'services/slices/orderSlice';


const FeedCard = ({ item }) => {
  const ingredientList = useSelector(store => store.ingredients.ingredients)
  const { number, createdAt, name, status, ingredients } = item;
  const [previews, setPreviews] = useState([])
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const location = useLocation()

  // собираем данные ингредиентов по их id
  const formattedIngredients = formatData(ingredients, ingredientList);

  // собираем данные для отображения списка ингредиентов
  useEffect(() => {
    for (let index = 0; index < formattedIngredients.length; index++) {
      const ingredient = formattedIngredients[index];
      let others = null;
      let zIndex = null;
      if (index === 5) {
        others = formattedIngredients.length - 5;
      }
      zIndex = formattedIngredients.length - index;

      setPreviews(prev => [
        ...prev,
        { others, ingredient, zIndex }
      ])
      if (others !== null) break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleOpen = () => {
    dispatch(setOrderToShow(item))
    dispatch(openDetailsModal())
  }

  const color = status === 'done' ? 'var(--colors-interface-success)' : status === 'canceled' ? 'var(--colors-interface-error)' : 'inherit';

  const date = formatOrderDate(createdAt)
  const price = formattedIngredients && ingredients &&
    formattedIngredients.reduce(function (prevValue, item) {
      return prevValue + item.price;
    }, 0);


  return (
    <Link to={{ pathname: `${url}/${number}`, state: { from: location.pathname, pushLocation: location } }} className={styles.link} onClick={handleOpen}>
      <article className={styles.card} >
        <header className={styles.header}>
          <span className={styles.id}>#{number}</span>
          <time className={styles.time}>{date}</time>
        </header>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.status} style={{ color }}>{status === 'done' ? 'Выполнен' : status === 'canceled' ? 'Отменен' : 'Выполняется'}</p>
        <div className={styles.content}>
          <ul className={styles.ingredients}>
            {
              previews.map((item) => (
                <li key={nanoid()} style={{ zIndex: item.zIndex }}>
                  <div className={styles.preview}>
                    {item.others && <span className={styles.others}>+{item.others}</span>}
                    <img className={styles.image} src={item.ingredient.image_mobile} alt={item.ingredient.name} />
                  </div>
                </li>
              ))
            }
          </ul>
          <Price>{price}</Price>
        </div>
      </article>
    </Link>
  );
}

export default FeedCard;

FeedCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}


