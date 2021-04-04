import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Todo from './todo_list/Todo';
function App() {
    return (
    <div className="App">
        <Todo></Todo>
    </div>
);
}

export default App;
