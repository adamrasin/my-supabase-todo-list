import React, { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewToDo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const todo: Todo = {
        id: Date.now(),
        text: newTodo,
      };
      setTodos([...todos, todo]);
      setNewToDo("");
    }
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  }

  return (
    <div className="App">
      <h2>My To-do list</h2>
      <input type="text" id='myInput' placeholder='Sem napiš svůj úkol!' value={newTodo} onChange={(e) => setNewToDo(e.target.value)} />
      <button onClick={addTodo}>Přidat</button>
      <ul id='myUl'>
        {
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => removeTodo(todo.id)}>Smazat</button>
            </li>

          )
        )
        }
      </ul>
    </div>
  );
}

export default App;
