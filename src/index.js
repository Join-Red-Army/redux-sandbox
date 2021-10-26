import { createStore } from 'redux';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    default:
      return state;
  }
};

// создание
const store = createStore(reducer);

// будет срабатывать при изменении store
store.subscribe(() => {
  console.log(store.getState());
});

// изменение store
store.dispatch({type: 'INC'});
store.dispatch({type: 'INC'});
