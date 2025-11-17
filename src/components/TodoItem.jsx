import { useState } from 'react'

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.title)

  const handleToggle = () => {
    onUpdate(todo.id, { completed: !todo.completed })
  }

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, { title: editText })
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    onDelete(todo.id)
  }

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed || false}
        onChange={handleToggle}
        className="checkbox"
      />
      {isEditing ? (
        <div className="edit-section">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <button onClick={handleSave} className="btn btn-save">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn btn-cancel">Cancel</button>
        </div>
      ) : (
        <div className="view-section">
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
          <div className="actions">
            <button onClick={() => setIsEditing(true)} className="btn btn-edit">Edit</button>
            <button onClick={handleDelete} className="btn btn-delete">Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}