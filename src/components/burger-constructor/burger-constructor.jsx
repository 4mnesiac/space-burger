import React from 'react';
import constructorStyles from './burger-constructor.module.css';
import Scrollbar from '../custom-scrollbar/custom-scrollbar';
import {ConstructorList, Order} from './parts';



export default class BurgerIngridients extends React.Component {

    render() {
        const total = this.props.data.reduce((acc, p) => acc + p.price, 0);
        return (
            <section className={constructorStyles.constructor}>
                <Scrollbar context="constructor">
                    <ConstructorList data={this.props.data}/>
                </Scrollbar>
                <Order total={total}/>
            </section>
        );
    }
}