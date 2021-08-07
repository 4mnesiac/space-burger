import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-item.module.css'
import { TIngredient } from 'types/types'
import { FC } from 'react'

interface IOrderItem {
  ingredient: TIngredient
  price: number
}

const OrderItem: FC<IOrderItem> = ({ ingredient, price }) => {
  return (
    <article className={styles.ingredient}>
      <div className={styles.ingredient}>
        <picture className={styles.picture}>
          <img src={ingredient.image_mobile} alt={ingredient.name} />
        </picture>
      </div>
      <h4 className={styles.ingredient_name}>{ingredient.name}</h4>
      <span className={styles.price}>
        {1}&nbsp;x&nbsp;{price}
        <CurrencyIcon type='primary' />
      </span>
    </article>
  )
}

export default OrderItem
