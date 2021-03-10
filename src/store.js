import { createStore } from "redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

// const reducer = (state = [], action) => {
//     switch (action.type) {
//         case addToDo.type:
//             console.log(action);
//             return [{ text: action.payload, id: Date.now() }, ...state];

//         case deleteToDo.type:
//             return state.filter((toDo) => toDo.id !== action.payload);

//         default:
//             return state;
//     }
// };

// createReducer에는 두가지의 선택지가 존재
// state를 mutate하거나 새로운 state를 만들어 return
// 그렇다면 리덕스 툴킷에서 state를 mutate해도 되는 이유?
// 리덕스 툴킷이 immer아래서 작동되기 때문
// 뒷단에서는 리덕스 툴킷과 immer가 return [{ text: action.payload, id: Date.now() }, ...state]; 이기능을 작동
// 사용자는 state를 mutate해도됨

const reducer = createReducer([], {
    [addToDo]: (state, action) => {
        state.push({ text: action.payload, id: Date.now() });
    },

    [deleteToDo]: (state, action) =>
        state.filter((toDo) => toDo.id !== action.payload),
});

const store = createStore(reducer);

export const actionCreators = {
    addToDo,
    deleteToDo,
};

export default store;
