import PropTypes from "prop-types";
import styles from './scroll-container.module.css';

const ScrollContainer = ({ children, height, type }) => {
    return (
        <>
            {type === 'list' ?
                (
                    <ul className={styles.scroller} style={{ maxHeight: height }}>
                        {children}
                    </ul>
                ) : (
                    <div className={styles.scroller} style={{ maxHeight: height }}>
                        {children}
                    </div>
                )
            }
        </>
    );
}

ScrollContainer.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  type: PropTypes.string
}

export default ScrollContainer;