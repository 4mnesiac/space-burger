import React from 'react';
import { ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import bunStyles from './bun.module.css'
import PropTypes from 'prop-types';

const Bun = ({data, position}) => {
    return ( 
        <div className={bunStyles.bun}>
            {data &&
            <ConstructorElement
                type={position}
                isLocked={true}
                text={data.name}
                price={data.price}
                thumbnail={data.image}
            />
            }
        </div>
     );
}
 
export default Bun;

Bun.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }),
    position: PropTypes.string.isRequired,
}