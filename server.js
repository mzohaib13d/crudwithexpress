import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())

// In-memory storage
let todos = [
{
  id: 1,
  title: `یہ لڑکا ہائے اللہ! کیسا ہے دیوانہ
کتنا مشکل ہے توبہ، اِس کو سمجھانا
کہ دھیرے دھیرے دل بےقرار ہوتا ہے
ہوتے ہوتے ہوتے… پیار ہوتا ہے`,
  completed: false
}
,
  { id: 2, title: `دہلیز پہ میرے دل کی جو رکھے ہیں تو نے قدم    
    تیرے نام پہ میری زندگی لکھ دی میرے ہم دم
    ہاں سیکھا میں نے جینا جینا۔ کیسے جینا 
    ہاں سیکھا میں نے جینا میرے ہم دم  `, 
    completed: false },
  { id: 3, title: `تو پاس ہے، میرے پاس ہے ایسے
میرا کوئی احساس ہے جیسے
تو پاس ہے، میرے پاس ہے ایسے
میرا کوئی احساس ہے جیسے

ہائے، میں مر ہی جاؤں جو تجھ کو نہ پاؤں
باتوں میں تیری میں راتیں بِتاؤں

ہونٹوں پہ لمحہ لمحہ
ہے نام تیرا، ہائے
تجھ کو ہی گاؤں میں
تجھ کو پکاروں اوں اوں`
, completed: false }
]

let nextId = 4

// GET all todos - READ
app.get('/api/todos', (req, res) => {
  res.json(todos)
})

// GET single todo
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id))
  if (!todo) return res.status(404).json({ message: 'Todo not found' })
  res.json(todo)
})

// POST new todo - CREATE
app.post('/api/todos', (req, res) => {
  const { title } = req.body
  if (!title) return res.status(400).json({ message: 'Title is required' })

  const newTodo = {
    id: nextId++,
    title,
    completed: false
  }
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

// PUT update todo - UPDATE
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id))
  if (!todo) return res.status(404).json({ message: 'Todo not found' })

  if (req.body.title) todo.title = req.body.title
  if (req.body.completed !== undefined) todo.completed = req.body.completed

  res.json(todo)
})

// DELETE todo - DELETE
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Todo not found' })

  const deletedTodo = todos.splice(index, 1)
  res.json(deletedTodo[0])
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})