import './Todo.css';
import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './Todo.css';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    console.log(stored);

    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  // add Todo
  const addTodo = () => {
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setText('');
  };

  // remove Todo
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // toggle complete
  function toggleComplete(id) {
    const completed = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(completed);
  }

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // start Edit
  function startEdit(id) {
    const editItem = todos.find((todo) => todo.id === id);
    setEditId(id);
    setEditText(editItem.text);
  }

  //  Save Edit
  function saveEdit() {
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText('');
  }

  // Filter Todo
  const filterTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  useEffect(() => {
    // localstorage
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='todo-container'>
      <h2>TodoApp</h2>
      <div className='filters'>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <div>
        <input
          className='todo-input'
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Add a Task...'
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className='todo-list'>
        {filterTodos.map((todo) =>
          editId === todo.id ? (
            <li key={todo.id}>
              <input
                className='todo-item edit-mode'
                type='text'
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={saveEdit}>Save</button>
            </li>
          ) : (
            <TodoItem
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              toggleComplete={toggleComplete}
              startEdit={startEdit}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default TodoApp;
