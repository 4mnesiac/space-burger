import React, { FC } from 'react'
import styles from './burger-constructor.module.css'
import { IngredientsList, Order, Bun } from './parts'
import { useAppDispatch } from '../../services/hooks'
import { useDrop } from 'react-dnd'
import { addIngredient, countTotal } from 'services/slices/cartSlice'

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch()

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addIngredient(item))
      dispatch(countTotal())
    },
  })

  const border = isHover ? '1px dashed gray' : 'none'

  return (
    <section className={styles.container} ref={dropRef} style={{ border }}>
      <Bun position='top' />
      <div className={styles.scroller}>
        <IngredientsList />
      </div>
      <Bun position='bottom' />
      <Order />
    </section>
  )
}
export default BurgerConstructor
