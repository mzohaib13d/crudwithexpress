import TodoItem from './TodoItem'

export default function TodoList({ todos, onUpdate, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet. Add one to get started!</p>
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}