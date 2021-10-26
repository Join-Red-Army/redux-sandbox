import { createStore, bindActionCreators } from 'redux';
import reducer from './reducer';
import * as actions from './actions';

// создание store
const store = createStore(reducer);
// для удобства, dispatch можно деструктуризировать
const { dispatch } = store;


// bindActionCreators
const { inc, dec, rnd } = 
  bindActionCreators(actions, dispatch);


// увеличить
document
  .getElementById('inc')
  .addEventListener('click', inc);

// уменьшить
document
  .getElementById('dec')
  .addEventListener('click', dec);

// случайное число
document
  .getElementById('rnd')
  .addEventListener('click', () => {
    const payload = Math.floor(Math.random() * 10);
    rnd(payload);
  });

// обновить значение
const update = () => {
  document
    .getElementById('counter')
    .innerHTML = store.getState();
}

store.subscribe(update);