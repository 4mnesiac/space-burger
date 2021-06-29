import React, { useEffect } from 'react';
import menuStyles from './menu.module.css';
import Card from '../card/card';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

const MenuItem = React.memo(({title, refs, data, onClick}) => {
    return (
        <>
            <h2 className={menuStyles.title} ref={refs}>{title}</h2>
            <ul className={menuStyles.items}>
                {data && data.map(item => (
                    <li key={item._id}>
                        <Card item={item} onClick={onClick}/>
                    </li>
                ))
                }
            </ul>
        </>
    )
}
);

const Menu = ({ setCurrent, onClick }) => {
    const { ingredients } = useSelector(store => store.ingredients);

    // изменение табов в зависимости от скролла
    const [bunRef, inViewBun] = useInView({ threshold: 0 });
    const [sauceRef, inViewSauce] = useInView({ threshold: 0 });
    const [mainRef, inViewMain] = useInView({ threshold: 0 });

    useEffect(() => {
        if (inViewBun) {
            setCurrent('bun')
        } else if (inViewSauce) {
            setCurrent('sauce')
        } else if (inViewMain) {
            setCurrent('main')
        } 
    }, [setCurrent, inViewBun, inViewSauce, inViewMain])

    return (
        <div className={menuStyles.scroller}>
            <MenuItem title="Булки" refs={bunRef} data={ingredients.filter(ingredient => ingredient.type === 'bun')} onClick={onClick}/>
            <MenuItem title="Начинки" refs={mainRef} data={ingredients.filter(ingredient => ingredient.type === 'main')} onClick={onClick}/>
            <MenuItem title="Соусы" refs={sauceRef} data={ingredients.filter(ingredient => ingredient.type === 'sauce')} onClick={onClick}/>
        </div>
    )
}

export default Menu;

MenuItem.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    title: PropTypes.string.isRequired,
    refs: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}
Menu.propTypes = {
    setCurrent: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}

