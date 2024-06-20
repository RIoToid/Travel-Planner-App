import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/users')
      .then(response => response.json())
      .then(data => { setData(data); console.log(data)});
  }, []);

  return (
    <div>
      {data.map(user => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
