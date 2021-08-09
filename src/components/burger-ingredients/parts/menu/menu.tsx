import React, { useEffect, FC } from 'react';
import menuStyles from './menu.module.css';
import { useAppSelector } from 'services/hooks';
import { useInView } from 'react-intersection-observer';
import { MenuItem } from '../menu-item';
import { TIngredient } from 'types/types';

interface IMenu {
    setCurrent: (current: string) => void;
    onClick: (item: TIngredient) => void;
}

const Menu: FC<IMenu>= ({ setCurrent, onClick }) => {
    const { ingredients } = useAppSelector(store => store.ingredients);

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

