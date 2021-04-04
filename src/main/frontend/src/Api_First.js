import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
    const [message,setMessage] = useState("");
    const [api, setApi] = useState(null);
    const [message2,setMessage2] = useState("");
    const [obj, setObj] = useState(null);
    useEffect(() => {
        fetch('/api/hello').then(r => r.text())
        .then(m => {
            setMessage(m);
        })
    }, [])


    useEffect(() => { fetch('/api/upgrade?name=이름').then(r => r.text()).then(m => {
            console.log(typeof(m));
            setApi(m);
        })
    }, []);

    useEffect(() => { fetch('/api/upgrade?name=주원')
        .then(r => r.json())
        .then(data => console.log(data))
    }, []);

    axios.get('http://localhost:8080/api/hello')
    .then(r => setMessage2(r.data))
    .catch((error) => {
        console.log(error);
    });

    return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{message}</h1>
        <h1>{message2}</h1>
        <h2>{api}</h2>
        <h3>{obj}</h3>
    </div>
);
}

export default App;
