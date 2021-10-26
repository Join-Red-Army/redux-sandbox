import { createStore } from 'redux';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'RND':
      return state + action.payload;

    case 'INC':
      return state + 1;

    case 'DEC':
      return state - 1;

    default:
      return state;
  }
};

const store = createStore(reducer);

const inc = () => ( {type: 'INC'} );
const dec = () => ( {type: 'DEC'} );
const rnd = (payload) => ( {type: 'RND', payload} );



// увеличить
document
  .getElementById('inc')
  .addEventListener('click', () => {
    store.dispatch(inc());
  });

// уменьшить
document
  .getElementById('dec')
  .addEventListener('click', () => {
    store.dispatch(dec());
  });

// случайное число
document
  .getElementById('rnd')
  .addEventListener('click', () => {
    const payload = Math.floor(Math.random() * 10);
    store.dispatch(rnd(payload));
  });

// обновить значение
const update = () => {
  document
    .getElementById('counter')
    .innerHTML = store.getState();
}

store.subscribe(update);