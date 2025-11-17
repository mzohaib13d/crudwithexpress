import { useState, useEffect } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all todos
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos')
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  // Add todo (Create)
  const addTodo = async (title) => {
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  // Update todo
  const updateTodo = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      const updatedTodo = await response.json()
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE'
      })
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Todo CRUD App Zohaib Farooq</h1>
        <TodoForm onAdd={addTodo} />
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
        )}
      </div>
    </div>
  )
}

export default App