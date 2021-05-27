
import menuStyles from './menu.module.css';
import Card from '../card/card'

const Menu = (props) => {
    const buns = props.data.filter(item => item.type === 'bun')
    const sauces = props.data.filter(item => item.type === 'sauce')
    const main = props.data.filter(item => item.type === 'main')

    return (
        <>
            <h2 className={menuStyles.title}>{props.current}</h2>
            <div className={menuStyles.items}>
                {(props.current === 'Булки' ? buns : props.current === 'Соусы' ? sauces : props.current === 'Начинки' ? main : props.data)
                    .map(item => (
                        <Card item={item} key={item._id} />
                    ))
                }
            </div>

        </>
    )
}
export default Menu;