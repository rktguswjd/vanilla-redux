# Vanilla Redux

Learning Vanilla-Redux and React-Redux

## Redux

리덕스는 자바스크립트 애플리케이션에서 상태를 효율적으로 관리할 수 있게 도와주는 도구이다. 리덕스를 사용하면, 만들게 된 컴포넌트들의 상태 관련 로직들을 다른 파일들로 분리시켜서 더욱 효율적으로 관리 할 수 있다. 또한, 컴포넌트끼리 상태를 공유하게 될 때 여러 컴포넌트를 거치지 않고도 손쉽게 상태 값을 전달 할 수 있다.
<br />
<br />

## 필요성

리액트를 사용하면서 상태를 관리하는 것은 매우 중요한 요소 중 하나이다. 리액트로 만들 수 있는 단일 페이지 애플리케이션(SAP, Single Page Application)는 data 혹은 UI의 변화가 복잡, 다양해지는 경우가 많아진다. 그에 따라 단일 페이지를 이루는 컴포넌트들의 데이터 교류 또한 복잡해지기 때문에 이를 효율적으로 관리할 방법이 필요하다. 리덕스는 이러한 복잡한 상태 관리를 효율적으로 할 수 있게 도와주는 도구이다.

리덕스를 사용하면 상태값을 컴포넌트에 종속시키지 않고, 상태관리를 바깥에서 할 수 있게 해준다.
<br />
<br />

## 개념 정리

### 액션 (Action)

상태의 어떠한 변화가 필요하게 될 때, 우리는 액션을 발생 시킨다. 이 액션은 하나의 객체(object)로 표현된다.

```javascript
{
    type: "TOGGLE_VALUE";
}
```

액션 객체는 `type` 필드를 필수적으로 가지고 있어야하고 그 외의 값들은 개발자 마음대로 넣어줄 수 있다.

```javascript
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스를 배우자"
  }
}
```

### 액션 생성함수 (Action Creator)

액션 생성함수는, 액션을 만드는 함수다. 단순히 파라미터를 받아와서 액션 객체 형태로 만든다.

```javascript
const changeInput = (text) => ({
    type: "ADD_TODO",
    text,
});
```

### 리듀서 (Reducer)

리듀서는 변화를 일으키는 함수다. 리듀서는 두가지의 파라미터를 받아온다.

```javascript
const reducer = (state, action) => {
    // 상태 업테이트 로직
    return alteredState;
};
```

리듀서는, 현재 상태와 전달 받은 액션을 참고하여 새로운 상태를 만들어서 반환한다.

### 스토어 (Store)

리덕스에서는 한 애플리케이션 당 하나의 스토어를 만들게 된다. 스토어 안에는 현재의 앱 상태와 리듀서가 들어가 있고, 추가적으로 몇가지 내장 함수들이 있다.

### 디스패치 (dispatch)

디스패치는 스토어의 내장함수 중 하나이다. 디스패치는 액션을 발생시켜 스토어에게 상태 변화가 필요하다는 것을 알린다. dispatch라는 함수에 액션을 파라미터로 전달한다.

### 구독 (subscribe)

구독 또한 스토어의 내장함수 중 하나이다. subscribe 함수는 함수 형태의 값을 파라미터로 받아온다. subscribe 함수에 특정 함수를 전달해주면 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출된다.
<br />
<br />

## React-Redux

react-redux는 상태 관리를 하기 위해 react에 redux를 연결해주는 역할을 한다.

### Provider

provider는 단순한 하나의 컴포넌트다. react로 작성된 컴포넌트들을 provider안에 넣으면 하위 컴포넌트들이 provider를 통해 redux store에 접근이 가능해 진다.

```javascript
/* index.js */

// react의 props처럼 redux로 만든 store를 Provider에 적용
// App 컴포넌트는 store에 접근 가능

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
```

### connect()

connect함수는 Provider 컴포넌트 하위에 존재하는 컴포넌트들이 store에 접근하게 만드는 역할을 해준다.

```javascript
/* Home.js */

// connect 함수를 실행시키고 Home 컴포넌트에서 store에 접근 가능

export default connect()(Home);
```

-   mapStateToProps

mapStateToProps는 connect 함수에 첫 번째 인수로 들어가는 함수 혹은 객체다. mapStateToProps는 기본적으로 store가 업데이트 될때 마다 자동적으로 호출된다. 이를 원하지 않는다면 null 혹은 undefined값을 제공해야한다.

```javascript
/* mapStateToProps의 첫 번째 인자 */

// mapStateToProps는 기본적으로 state가 첫 번째 인자로 사용됨
// 그로인해 state를 다룰 수 있게 됨
const mapStateToProps = (state) => {
    return { sexy: true };
};
```

```javascript
/* mapStateToProps의 두 번째 인자 */

// mapStateToProps의 두 번째 요소로는 원하는 객체를 인자로 넘겨주면 됨
// state와 ownProps 모두 순수 객체여야 함
const mapStateToProps = (state, ownProps) => {
    return { sexy: true };
};
```

```javascript
/* mapStateToProps를 connect 함수에 사용하기 */

const mapStateToProps = (state, ownProps) => {
    return { sexy: true };
};

// connect 첫 번째 인자로 mapStateToProps 함수를 제공
export default connect(mapStateToProps)(Home);
```

-   mapDispatchToProps

mapDispatchToProps는 connect 함수의 두 번째 인자로 사용된다. 이것은 기본적으로 store에 접근한 컴포넌트가 store의 상태를 바꾸기 위해 dispatch를 사용할 수 있게 만들어준다.

```javascript
/* mapDispatchToProps의 dispatch */

// mapDispatchToProps는 첫 번째 인자로 redux의 dispatch를 인자로 사용
// 이를 통해 store의 상태를 변경
const mapDispatchToProps = (dispatch) => {
    // 순수 객체 반환
    return {
        // 순수 action 객체를 dispatch
        addToDo: (text) => dispatch(actionCreators.addToDo(text)),
    };
};
```

<br />
<br />

## Redux Toolkit

리덕스를 사용하다보면 코드의 양이 계속 늘어나기 마련이고 그에따라 계속 복잡해진다. 리덕스 툴킷을 적용하면 코드를 상당 부분 줄일 수 있으며 쉽게 사용할 수 있다. 최근 리덕스 툴킷은 리덕스 로직 작성을 위해 redux 제작자들이 공식적으로 추천하는 방법이다.

### createAction

createAction은 type만 넣어주면 알아서 Action Object를 생성한다.

```javascript
const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
    return { type: ADD, text };
};

const deleteToDo = (id) => {
    return { type: DELETE, id: parseInt(id) };
};
```

다음 코드는 위 코드를 createAction을 사용해 액션 생성 함수를 만든 것이다.

```javascript
const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

// {type: "ADD", payload: "리덕스툴깃"}
```

위에서 만든 액션 생성 함수를 호출할 때 인자를 넣어주면 payload 필드에 자동으로 들어간다.

### createAction

기존 reducer을 사용할 때 switch문을 사용해 action type을 구분해 로직을 수행했다. 하지만 redux/toolkit에서는 switch문이 사라졌고, 첫 번째 인자인 initalState가 default이기에 switch문의 default 또한 필요 없다.

```javascript
// 기존 reducer

const reducer = (state = [], action) => {
    switch (action.type) {
        case addToDo.type:
            return [{ text: action.payload, id: Date.now() }, ...state];

        case deleteToDo.type:
            return state.filter((toDo) => toDo.id !== action.payload);

        default:
            return state;
    }
};
```

```javascript
// redux/toolkit의 createReducer를 사용해 만든 reducer

const reducer = createReducer([], {
    [addToDo]: (state, action) => {
        state.push({ text: action.payload, id: Date.now() });
    },

    [deleteToDo]: (state, action) =>
        state.filter((toDo) => toDo.id !== action.payload),
});
```

위 코드를 보면 createReducer로 만든 reducer는 새로운 state를 만들어 반환 하거나 state를 mutate한다. 리덕스 툴킷에서 state를 mutate해도 되는 이유는 리덕스 툴킷이 이머(immer)아래서 작동되기 때문이다. 사용자는 state를 mutate하지만 사실은 리덕스 툴킷과 이머가 현재 상태와 전달 받은 액션을 참고하여 새로운 상태를 만들어서 반환하는 것이다.

### configureStore

리덕스에서 createStore를 사용했던 것과는 달리 툴킷에서 configureStore를 사용한다. default로 redux dev Tool을 제공해 따로 라이브러리를 설치하거나 미들웨어로 넣어 줄 필요가 없다.

```javascript
const store = configureStore({ reducer });
```

### createSlice

리덕스 모듈 하나를 만들려면 action type을 정의하고, action creator를 만들고, reducer까지 만들어야 한다. createSlice는 action과 reducer 전부를 가지고 있는 함수다.

```javascript
const toDos = createSlice({
    name: "toDosReducer",
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push({ text: action.payload, id: Date.now() });
        },
        remove: (state, action) =>
            state.filter((toDo) => toDo.id !== action.payload),
    },
});
```

name 속성은 액션의 경로를 잡아줄 해당 이름을 나타내고, initialState는 초기 state를 나타낸다. reducer는 이전에 사용하던 action의 구분을 주어 해당 action의 로직을 수행하는 방법과 동일하다. 차이점으로는 기존에 액셩 생성 함수와 액션 타입을 선언해 사용했었다면, createSlice의 reducers 에서는 이 과정을 건너뛰고 액션을 선언하고 해당 액션이 디스패치되면 바로 state를 가지고 해당 액션을 처리한다. 즉, reducers 안의 코드들은 action type, action create function, reducer의 기능이 합쳐져 있는 셈이다.
