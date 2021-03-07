import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// sotre : data(state)를 저장하는 곳
// reducer : data를 modify해주는 함수로 reducer가 return하는 것은 application에 있는 data가 됨

const countReducer = (count = 0) => {
    return count;
};
const countStore = createStore(countReducer);
console.log(countStore.getState());
