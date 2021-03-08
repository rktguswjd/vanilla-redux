import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case ADD_TODO:
            // mutate state는 절대로 하면 안됨!
            // 이전 상태로 새로운 객체를 리턴해줘야함 !
            return [...state, { text: action.text, id: Date.now() }];
        case DELETE_TODO:
            return [];
        default:
            return state;
    }
};
const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const onSubmit = (e) => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    store.dispatch({ type: ADD_TODO, text: toDo });
};

form.addEventListener("submit", onSubmit);
