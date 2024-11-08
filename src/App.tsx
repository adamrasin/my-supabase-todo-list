import React, { useState, useEffect } from 'react';
import './App.css';
import { Todo } from './types';
import { fetchTodos, addTodo, toggleComplete, deleteTodo } from './api/todos';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewToDo] = useState<string>("");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromDb = await fetchTodos();
        setTodos(todosFromDb);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    loadTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim() === "") return;

    try {
      await addTodo(newTodo);
      const todosFromDb = await fetchTodos(); 
      setTodos(todosFromDb);
      setNewToDo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id.toString());
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await toggleComplete(id.toString(), !completed);
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
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
      <button onClick={handleAddTodo}>Přidat</button>
      <ul id="myUl">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => handleToggleComplete(todo.id, todo.completed)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Smazat</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;