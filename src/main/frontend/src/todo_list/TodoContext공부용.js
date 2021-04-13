import React, {useRef, useReducer, createContext, useContext, useEffect} from 'react';
import axios from 'axios';
import cors from 'cors';


const initialTodos = [

];

function todoReducer(state, action) {
  switch (action.type) {
    case 'FETCH' :
        return state.concat(action.todo);
    case 'CREATE' :
      return state.concat(action.todo);
    case 'TOGGLE' :
      return state.map(todo =>
        todo.id === action.id ? {...todo, done : !todo.done} : todo);
    case 'REMOVE' :
      return state.filter(todo => todo.id !== action.id);

    default:
      throw new Error('unhandled!!!');
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}) {
  console.log("훅스의 첫부분입니다.");
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(0);

  const fetchdata = async () => {
    console.log("훅스의 USE EFFECT 실행!!");
//         await axios.get('http://localhost:8080/api/todo-array').then(r => dispatch({type:'FETCH', todo:r.data}))
    try {
        const res = await axios.get('http://localhost:8080/api/todo-array');
        dispatch({type:'FETCH', todo:res});
        nextId.current = state.length;
        console.log(state);
        console.log('state length : ', state.length);
    } catch {
          console.log('error!');
      };
  }
  useEffect(fetchdata, []);

  console.log("USE EFFECT 다음 부분임");
  nextId.current = state.length;
  console.log(state);
  console.log('nextId. current = ' , nextId.current);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {console.log('렌더링 중입니다.~~~')}
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if(!context)
    return new Error('Cannot find TodoProvider');
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}