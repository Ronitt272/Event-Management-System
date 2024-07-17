import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    // Fetch data from the Express server
    axios.get('http://localhost:5000/todos')
      .then(response => {
        console.log(response)
        setTodos(response.data)
      })
      .catch(error => console.error(error));
  }, []);
  return (
    <div>
      <h1>MERN Stack Todo App</h1>
      <ul>
        {todos}
      </ul>
    </div>
  );
};
export default App;