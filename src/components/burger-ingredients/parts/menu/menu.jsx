import React from 'react';
import menuStyles from './menu.module.css';
import Card from '../card/card';
import PropTypes from 'prop-types';

const Menu = ({ data, current }) => {
    const bunRef = React.useRef(null)
    const sauceRef = React.useRef(null)
    const mainRef = React.useRef(null)

    React.useEffect(() => {
        (current === 'bun'
            ? bunRef
            : current === 'sauce'
                ? sauceRef
                : mainRef)
            .current.scrollIntoView()
    }, [current])

    return (
        <>
            <h2 className={menuStyles.title} ref={bunRef}>Булки</h2>
            <div className={menuStyles.items}>
                {data.filter(ingredient => ingredient.type === 'bun').map(bun => (
                    <Card item={bun} key={bun._id} count={0} />
                ))
                }
            </div>
            <h2 className={menuStyles.title} ref={sauceRef}>Соусы</h2>
            <div className={menuStyles.items}>
                {data.filter(ingredient => ingredient.type === 'sauce').map(sauce => (
                    <Card item={sauce} key={sauce._id} count={1} />
                ))
                }
            </div>
            <h2 className={menuStyles.title} ref={mainRef}>Начинки</h2>
            <div className={menuStyles.items}>
                {data.filter(ingredient => ingredient.type === 'main').map(main => (
                    <Card item={main} key={main._id} count={2} />
                ))
                }
            </div>

        </>
    )
}
export default Menu;

Menu.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,

    }).isRequired).isRequired,
    current: PropTypes.string
}
