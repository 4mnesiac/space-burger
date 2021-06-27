import React from 'react';
import constructorStyles from './burger-constructor.module.css';
import { IngredientsList, Order, Bun } from './parts';
import { useDispatch, useSelector } from 'react-redux';

import { useDrop } from "react-dnd";
import { addIngredient, countTotal} from 'services/cartSlice';

export default function BurgerConstructor() {
    const { bun } = useSelector(store => store.cart.sortedCart);

    const dispatch = useDispatch();
    const [{ isHover }, dropRef] = useDrop({
        accept: "ingredients",
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            dispatch(addIngredient(item));
            dispatch(countTotal())
        },
    });

    const border = isHover ? '1px dashed gray' : 'none';

    return (

        <section className={constructorStyles.constructor} ref={dropRef} style={{ border }} >
            <Bun position="top" data={bun} />
            <div className={constructorStyles.scroller}>
                <IngredientsList />
            </div>
            <Bun position="bottom" data={bun} />
            <Order />
        </section >


    );

}


