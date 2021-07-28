import React from 'react';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import bunStyles from './bun.module.css'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

const Bun = ({ position }) => {
    const { bun } = useSelector(store => store.cart.sortedCart);
    const [isEmpty, setIsEmpty] = useState(true);
    useEffect(() => {
        if (bun) {
            setIsEmpty(false)
        } else {
            setIsEmpty(true)
        }
    }, [bun])
    const positionText = position === 'top' ? '(верх)' : '(низ)';
    return (
        <div className={isEmpty ? bunStyles.bun_empty : bunStyles.bun}>
            {!isEmpty
                ? (
                    <ConstructorElement
                        type={position}
                        isLocked={true}
                        text={`${bun?.name} ${positionText}`}
                        price={bun?.price}
                        thumbnail={bun?.image}
                    />)
                : (
                    <ConstructorElement
                        type={position}
                        text={`Место для аппетитной булки ${positionText}`}
                    />)
            }
        </div>
    );
}

export default Bun;

Bun.propTypes = {
    position: PropTypes.string.isRequired,
}