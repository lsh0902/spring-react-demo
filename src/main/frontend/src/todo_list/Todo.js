import React from 'react';
import {createGlobalStyle} from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import {TodoProvider} from './TodoContext';
import logo from '../logo.svg';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function AppTodo() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <img src={logo} className="App-logo" alt="logo" />
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default AppTodo;
