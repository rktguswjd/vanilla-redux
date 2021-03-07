import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// sotre : data(state)를 저장하는 곳
// reducer : data를 modify해주는 함수로 reducer가 return하는 것은 application에 있는 data가 됨
// action : redux에서 함수를 부를 때 쓰는 두 번 째 parameter로 reducer와 소통하기 위한 방법
// reducer에게 action을 보내는 방법: store.dispatch({key: value});

const countReducer = (count = 0, action) => {
    if (action.type === "ADD") {
        return count + 1;
    } else if (action.type === "MINUS") {
        return count - 1;
    } else {
        return count;
    }
};
const countStore = createStore(countReducer);
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "MINUS" });
console.log(countStore.getState());
