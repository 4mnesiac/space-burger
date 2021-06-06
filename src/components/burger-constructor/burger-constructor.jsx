import React from 'react';
import constructorStyles from './burger-constructor.module.css';
import { IngredientsList, Order, Bun } from './parts';
import PropTypes from 'prop-types';


export default function BurgerConstructor({ data }) {
    const total = data.reduce((acc, p) => acc + p.price, 0);
    const bun = data.find(item => item.type === 'bun');

    return (
        <section className={constructorStyles.constructor}>
            <Bun position="top" data={bun} />
            <div className={constructorStyles.scroller}>
                <IngredientsList data={data.filter(item => item.type !== 'bun')} />
            </div>
            <Bun position="bottom" data={bun} />
            <Order total={total} />
        </section>
    );

}
BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired).isRequired,
}