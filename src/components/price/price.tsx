import styles from './price.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'

interface IPrice {
  iconType?: 'secondary' | 'primary' | 'error' | 'success'
  size?: 'default' | 'medium'
}

const Price: FC<IPrice> = ({ children, iconType = 'primary', size = 'default' }) => {
  return (
    <span className={`${styles.price} ${size === 'default' ? styles.default : styles.medium}`}>
      {children}
      <CurrencyIcon type={iconType} />
    </span>
  )
}

export default Price
