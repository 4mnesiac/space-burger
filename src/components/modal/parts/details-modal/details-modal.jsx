import React from 'react';
import detailsModalStyles from './details-modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NutritionList } from '../nutrition-list';

export default class Details extends React.Component {

    render() {
        return (
            <div className={detailsModalStyles.modal}>
                <div className={detailsModalStyles.header}>
                    <h2 className={detailsModalStyles.heading}>Детали ингридиента</h2>
                    <span className={detailsModalStyles.close} onClick={this.props.toClose}>
                        <CloseIcon />
                    </span>
                </div>
                <div className={detailsModalStyles.detail}>
                    <picture className={detailsModalStyles.picture}>
                        <source media="(max-width: 768px)" srcSet={this.props.data.image_mobile} />
                        <source media="(min-width: 1024px)" srcSet={this.props.data.image_large} />
                        <img src={this.props.data.image} alt={this.props.data.name} className={detailsModalStyles.image} />
                    </picture>
                    <h3 className={detailsModalStyles.title}>{this.props.data.name}</h3>
                    <NutritionList data={this.props.data} />
                </div>
            </div>
        )
    }
}