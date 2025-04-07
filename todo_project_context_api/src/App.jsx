import { useState, useEffect } from 'react'
import { TodoProvider } from '../context/TodoContext'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    )
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#172842] bg-cover bg-no-repeat bg-center relative">

        {/* Optional fancy background image */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center z-0"></div>

        <div className="relative z-10 w-full max-w-2xl mx-auto shadow-xl rounded-2xl px-6 py-6 text-white backdrop-blur-sm bg-white/10 mt-12">
          <h1 className="text-3xl font-extrabold text-center mb-10 mt-2 tracking-wide text-white drop-shadow-lg">
            📝 Manage Your Todos
          </h1>

          <div className="mb-6">
            <TodoForm />
          </div>

          <div className="flex flex-wrap gap-y-4">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
