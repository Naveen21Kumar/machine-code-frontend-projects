const TodoItem = ({ todo, removeTodo, toggleComplete, startEdit }) => {
  return (
    <li className='todo-item'>
      <span
        style={{ cursor: 'pointer' }}
        className={todo.completed ? 'completed' : ''}
        onClick={() => toggleComplete(todo.id)}>
        {todo.text}
      </span>
      <div className='actions'>
        <button onClick={() => startEdit(todo.id)}>edit</button>
        <button onClick={() => removeTodo(todo.id)}>delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
