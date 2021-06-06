import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import BurgerIngredients from 'components/burger-ingredients/burger-ingredients';

import { data } from "../../utils/data";

function App() {
  return (
    <>
    <AppHeader />п
    <div className={appStyles.wrapper}>
      <BurgerIngredients data={data}/>
      <BurgerConstructor data={data}/>
    </div>
    </>
  );
}

export default App;
