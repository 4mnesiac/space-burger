import React from 'react';
import constructorItemStyles from "./constructor-item.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorItem = ({item, type}) => {
    return ( 
        <li className={constructorItemStyles.item_container} key={item._id}>
            {/* тестовая логика для рендера Drag и Lock иконок */}
            {item.fat < 100 && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={item.fat < 100 ? false : true}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </li>
    );
}
 
export default ConstructorItem;