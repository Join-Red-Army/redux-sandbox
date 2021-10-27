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
//Создание
const reducer = (state, action) => newState

//state - текущее состояние
//action  - обычный JS-объект, в котором свойство type описывает действие, которое нужно совершить.
//Кроме обязательного свойства type, объект action также может содержать любые другие дополнительные свойства. Обычно поле с доп. Параметрами называется payload.

// Пример
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

## Action creator
Любые данные типа событий интерфейса, сетевые запросы и др. должны в конечном итоге отправляться как действия (dispatched as actions).

Действия – это простой JS объект с обязательным полем type.
Type могут быть строками или символами, но строки предпочтительнее потому что их можно сериализировать.

Action creator
Это функция, которая создаёт объекты action.
Чтобы постоянно не вбивать строки вручную, можно создать функции, которые будут их возвращать.
 
```js
const inc = () => ( {type: 'INC'} );
const dec = () => ( {type: 'DEC'} );
const rnd = (payload) => ( {type: 'RND', payload} );
```

## Структура проекта
Ни reducer, ни actions не зависят от сторонних библиотек. Их лучше вынести в отдельные файлы, а потом импортировать, куда требуется.

## bindActionCreators
Связывает функцию (action creator) с функцией dispatch.
В качестве результата вернёт объект. Его ключи – названия обёрнутых функций. 
Можно сразу деструктуризировать этот объект.

```js
import { createStore, bindActionCreators } from 'redux';

bindActionCreators(actionCreators, dispatch)

//fooA, fooB – это новые произвольные названия обёрнутых функций 
const { fooA, fooB } = bindActionCreators({
  fooA: actionCreatorA,
  fooB: actionCreatorA,
  }, dispatch);

// пример из кода
const { incDispatch, decDispatch, rndDispatch } = bindActionCreators({
  incDispatch: inc,
  decDispatch: dec,
  rndDispatch: rnd
}, dispatch);
```

## React + Redux
```js
// 1. В компонент React передаются все нужные функции для отрисовки и вычисления значений.
// 2. Поскольку нет State, компонент будет обновляться через store.subscribe(update).
// 3. Первый запуск update делается вручную.

const update = () => {
  ReactDom.render( <Counter {…свойства} />, document.getElementById('root'));
};

// первый запуск - вручную
update();
// повторные обновления делает store
store.subscribe(update);
```
