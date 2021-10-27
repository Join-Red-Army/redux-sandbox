import React from 'react';
import ReactDom from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import reducer from './reducer';
import * as actions from './actions';
import Counter from './counter';

// создание store
const store = createStore(reducer);
// для удобства, dispatch можно деструктуризировать
const { dispatch } = store;

// bindActionCreators
const { inc, dec, rnd } = 
  bindActionCreators(actions, dispatch);


// обновить значение
const update = () => {
  ReactDom.render(
    <Counter
      counter={store.getState()}
      inc={inc}
      dec={dec}
      rnd={() => {
        const value = Math.floor(Math.random()*10);
        rnd(value);  
      }} />, 
    document.getElementById('root')
  );
};

// первый запуск - вручную
update();
// повторные обновления делает store
store.subscribe(update);
