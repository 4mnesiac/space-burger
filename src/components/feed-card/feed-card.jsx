import React, { useState } from 'react';
import styles from './feed-card.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import Price from 'components/price/price';
import PropTypes from 'prop-types';

const FeedCard = ({ item }) => {
  const { id, datetime, name, status, price, ingredients } = item;
  const [previews, setPreviews] = useState([])

  // возможны баги
  useEffect(() => {
    for (let index = 0; index < ingredients.length; index++) {
      const ingredient = ingredients[index];
      let others = null;
      let zIndex = null;
      if (index === 5) {
        others = ingredients.length - 5;
      }
      zIndex = ingredients.length - index;

      setPreviews(prev => [
        ...prev,
        { others, ingredient, zIndex }
      ])
      if (others !== null) break;
    }
  }, [ingredients])

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.id}>#{id}</span>
        <time dateTime={datetime} className={styles.time}>Сегодня, 16:20 i-GMT+3</time>
      </header>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.status}>{status}</p>
      <div className={styles.content}>
        <ul className={styles.ingredients}>
          {
            previews.map((item) => (
              <li key={nanoid()} style={{ zIndex: item.zIndex }}>
                <div className={styles.preview}>
                  {item.others && <span className={styles.others}>+{item.others}</span>}
                  <img className={styles.image} src={item.ingredient.image} alt={item.ingredient.name} />
                </div>
              </li>
            ))
          }
        </ul>
        <Price>{price}</Price>
      </div>
    </article>

  );
}

export default FeedCard;

FeedCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired
  }).isRequired
}


