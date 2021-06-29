import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import BurgerIngredients from 'components/burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const API = 'https://norma.nomoreparties.space/api';

function App() {


  return (
    <>
      <AppHeader />
      <div className={appStyles.wrapper}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </>
  );
}

export default App;
