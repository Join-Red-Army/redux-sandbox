# redux-sandbox
Песочница для изучения Redux

## Reducer
Функция, которая умеет реагировать на действия и обновлять state.
Если state – undefined, то нужно вернуть первоначальный (initial) state.
Если тип action неизвестен – нужно вернуть state без изменений.

Reducer должна быть чистой функцией:
1. Возвращаемое значение завсит только от аргументов. Аргументы – это текущий state и action. Результат работы – новый state, должен зависимть исключительно от старого state и action и не от каких других параметров, которые берутся извне.
2. У reducer не может быть побочных эффектов: таймеров, записи значений в localStore, запросов на сервер и т.д.
Это помогает в крупных приложениях.

``` js
const reducer = (state, action) => newState

state    текущее состояние
action   обычный JS-объект, в котором описано действие, которое нужно совершить



const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    default:
      return state;
  }
};

let state = reducer(undefined, {});    // 0

state = reducer(state, {type: 'INC'}); // 1
console.log(state);
```

## Redux Store
Это центральный объект в системе Redux. Его задача – координировать работу других компонентов. 
Центральное место в нём занимает reducer.
Что касается state, то его можно получить из функции reducer, как в примере выше.

Store содержит внутри себя state tree. Чтобы изменить state, нужно отправить action.
Это обычный объект с несколькими методами, не класс. 
Создание store – это передача reduce-функции в функцию createStore().

```js
// Создать Store
import { createStore } from 'redux';
const store = createStore(reducer);

// Методы Store
.getState()
// возвращает текущий state

.dispatch(action)
// Обработать новый action и внести изменения в store.
// action – это всегда объект типа {type: 'ACTION'}

.subscribe(listener)
// Получать нотификации об изменениях store.
// Change listener. It will be called any time an action is dispatched.

.replaceReducer(nextReducer)
// ну понятно
```

