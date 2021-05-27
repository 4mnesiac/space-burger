import React from 'react';
import BurgerIngridients from 'components/burger-ingridients/burger-ingridients';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import { data } from "./utils/data";
import Modal from './components/modal/modal';

function App() {
  return (
    <>
    <AppHeader />
    <div className="wrapper">
      <BurgerIngridients data={data}/>
      <BurgerConstructor data={data}/>
    </div>
    <Modal data={data}/>
    </>
  );
}

export default App;
