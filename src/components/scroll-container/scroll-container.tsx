import { FC } from 'react'
import styles from './scroll-container.module.css'

interface IScrollContainer {
  height?: string
  type?: 'default' | 'list'
}

const ScrollContainer: FC<IScrollContainer> = ({ children, height, type }) => {
  return (
    <>
      {type === 'list' ? (
        <ul className={styles.scroller} style={{ maxHeight: height }}>
          {children}
        </ul>
      ) : (
        <div className={styles.scroller} style={{ maxHeight: height }}>
          {children}
        </div>
      )}
    </>
  )
}

export default ScrollContainer
