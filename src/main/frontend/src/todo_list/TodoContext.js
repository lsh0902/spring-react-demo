import React, {
  useRef,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import cors from "cors";

const initialTodos = [];

async function todoReducer(state, action) {
  switch (action.type) {
    case "FETCH":{
      console.log('fetch');
      return action.todo;
    }
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);

    default:
      throw new Error("unhandled!!!");
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(0);

  const fetchData = async () => {
    try {
      console.log('use context');
      const res = await axios.get("http://localhost:8080/api/todos");
      dispatch({ type: "FETCH", todo: res.data });
      nextId.current = state.length;
    } catch {
      console.log("error!");
    }
  };

  const addData = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:8080/api/todos",
        data: {
          text: "that is me",
        },
      });
    } catch {
      console.log("error...");
    }
  };

  useEffect(fetchData, []);
  nextId.current = state.length;

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          <button onClick={addData}>버튼</button>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) return new Error("Cannot find TodoProvider");
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
