import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import BurgerIngredients from 'components/burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './home.module.css'



const HomePage = () => {
    return (
        <div className={styles.wrapper}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </div>
    );
}

export default HomePage;