import React, { useRef, FC } from 'react'
import ingredientStyles from './ingredient.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch } from '../../../../services/hooks'
import { deleteIngredient, countTotal, moveIngredient } from 'services/slices/cartSlice'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { TIngredient } from 'types/types'
import { XYCoord } from 'dnd-core'

interface IConstructorIngredient {
  item: TIngredient
  index: number
}
interface DragItem {
  index: number
  id: string
  type: string
}

const Ingredient: FC<IConstructorIngredient> = ({ item, index }) => {
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLLIElement>(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'sort',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
      }
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const dropIndex = index

      if (dragIndex === dropIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < dropIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > dropIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch(moveIngredient({ dragIndex, dropIndex }))
      item.index = dropIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'sort',
    item: () => {
      return { item, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const handleClose = () => {
    dispatch(deleteIngredient({ id: item._id, itemIndex: index }))
    dispatch(countTotal())
  }
  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <li className={ingredientStyles.list_item} style={{ opacity }} data-handler-id={handlerId} ref={ref}>
      <div className={ingredientStyles.item_container}>
        <DragIcon type='primary' />
        <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} handleClose={handleClose} />
      </div>
    </li>
  )
}

export default Ingredient
