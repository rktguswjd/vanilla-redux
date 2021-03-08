import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// sotre : data(state)를 저장하는 곳
// reducer : data를 modify해주는 함수로 reducer가 return하는 것은 application에 있는 data가 됨
// action : redux에서 함수를 부를 때 쓰는 두 번 째 parameter로 reducer와 소통하기 위한 방법(반드시 object 형태, 액션은 반드시 type형식)
// reducer에게 action을 보내는 방법: store.dispatch({key: value});
// subscibe : store 안에 있는 변화를 감지
number.innerHTML = 0;

const ADD = "ADD";
const MINUS = "MINUS";

const countReducer = (count = 0, action) => {
    switch (action.type) {
        case ADD:
            return count + 1;

        case MINUS:
            return count - 1;

        default:
            return count;
    }
};
const countStore = createStore(countReducer);

const onChange = () => {
    number.innerHTML = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => {
    countStore.dispatch({ type: ADD });
};
const handleMinus = () => {
    countStore.dispatch({ type: MINUS });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
