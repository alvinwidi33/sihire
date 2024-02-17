import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [ users, setUsers ] = useState(null);

  useEffect(()=>{
    const getData = async () => {
      await fetch('http://127.0.0.1:8000/api/users/').then(
        resp => resp.json()).then(data => {
          setUsers(data);
        })
    }
    getData();
  },[])
  return (
    <div className="App">
      <header className="App-header">
        {users && users.map(user =>{
          return <p className="text-3xl" key={user.id}>{user.name} - {user.npm}</p>
        })}
      </header>
    </div>
  );
}

export default App;

