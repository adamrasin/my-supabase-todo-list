import React, { useState } from 'react';
import './App.css';
import { Todo } from './types'; 

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewToDo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const todo: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false, 
      };
      setTodos([...todos, todo]);
      setNewToDo("");
    }
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h2>My To-do list</h2>
      <input
        type="text"
        id="myInput"
        placeholder="Sem napiš svůj úkol!"
        value={newTodo}
        onChange={(e) => setNewToDo(e.target.value)}
      />
      <button onClick={addTodo}>Přidat</button>
      <ul id="myUl">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => removeTodo(todo.id)}>Smazat</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
