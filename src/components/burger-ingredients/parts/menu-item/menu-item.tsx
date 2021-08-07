import React, { FC, Ref } from 'react';
import styles from './menu-item.module.css'
import Card from '../card/card';
import { TIngredient, TingredientList } from 'types/types';

interface IMenuItem {
    title: string;
    refs: Ref<HTMLHeadingElement>;
    data: TingredientList;
    onClick: (item: TIngredient) => void;
}

const MenuItem: FC<IMenuItem> = React.memo(({ title, refs, data, onClick }) => {
    return (
        <>
            <h2 className={styles.title} ref={refs}>{title}</h2>
            <ul className={styles.items}>
                {data && data.map(item => (
                    <li key={item._id}>
                        <Card item={item} onClick={onClick} />
                    </li>
                ))}
            </ul>
        </>
    )
}
);
export default MenuItem;
