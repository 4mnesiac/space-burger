import React from 'react';
import constructorStyles from './burger-constructor.module.css';
import { IngredientsList, Order, Bun } from './parts';
import PropTypes from 'prop-types';


export default function BurgerConstructor({ data }) {
    const total = React.useMemo(() => data.reduce((acc, p) => acc + p.price, 0), [data]);
    const buns = React.useMemo(() => data.filter(item => item.type === 'bun'), [data]);

    return (
        <section className={constructorStyles.constructor}>
            <Bun position="top" data={buns[0]} />
            <div className={constructorStyles.scroller}>
                <IngredientsList data={data.filter(item => item.type !== 'bun')} />
            </div>
            <Bun position="bottom" data={buns[1]} />
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