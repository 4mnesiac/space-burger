import React from 'react';
import BurgerIngridients from 'components/burger-ingridients/burger-ingredients';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import { data } from "../../utils/data";

function App() {
  return (
    <>
    <AppHeader />
    <div className={appStyles.wrapper}>
      <BurgerIngridients data={data}/>
      <BurgerConstructor data={data}/>
    </div>
    </>
  );
}

export default App;
