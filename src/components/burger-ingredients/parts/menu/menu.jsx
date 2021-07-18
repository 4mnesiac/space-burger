import React, { useEffect } from 'react';
import menuStyles from './menu.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { MenuItem } from '../menu-item';

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
            <MenuItem title="Булки" refs={bunRef} data={ingredients && ingredients.filter(ingredient => ingredient.type === 'bun')} onClick={onClick} />
            <MenuItem title="Начинки" refs={mainRef} data={ingredients && ingredients.filter(ingredient => ingredient.type === 'main')} onClick={onClick} />
            <MenuItem title="Соусы" refs={sauceRef} data={ingredients && ingredients.filter(ingredient => ingredient.type === 'sauce')} onClick={onClick} />
        </div>

    )
}

export default Menu;


Menu.propTypes = {
    setCurrent: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}

