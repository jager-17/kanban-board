import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Board() {
  const navigate = useNavigate()

  const [taskInput, setTaskInput] = useState("")

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved
      ? JSON.parse(saved)
      : {
          todo: [],
          inProgress: [],
          done: [],
        }
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const logout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  const addTask = () => {
    if (!taskInput.trim()) return

    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, taskInput],
    }))

    setTaskInput("")
  }

  const moveTask = (from, to, index) => {
    const taskToMove = tasks[from][index]

    const updatedFrom = tasks[from].filter((_, i) => i !== index)

    setTasks(prev => ({
      ...prev,
      [from]: updatedFrom,
      [to]: [...prev[to], taskToMove],
    }))
  }

  const deleteTask = (column, index) => {
    const updated = tasks[column].filter((_, i) => i !== index)

    setTasks(prev => ({
      ...prev,
      [column]: updated,
    }))
  }

  const renderColumn = (title, key) => (
    <div className="bg-blue-900/70 backdrop-blur p-5 rounded-xl shadow-lg min-h-[300px]">
      <h2 className="text-xl font-semibold mb-4 flex justify-between">
        {title}
        <span className="text-sm bg-gray-700 px-2 py-1 rounded">
          {tasks[key].length}
        </span>
      </h2>

      {tasks[key].length === 0 && (
        <p className="text-gray-400 text-sm">No tasks here</p>
      )}

      {tasks[key].map((task, index) => (
        <div
          key={index}
          className="bg-gray-700 p-3 mb-3 rounded-lg flex justify-between items-center hover:bg-gray-600 transition"
        >
          <span>{task}</span>

          <div className="flex gap-2">
            {/* Move Left */}
            {key !== "todo" && (
              <button
                onClick={() =>
                  moveTask(
                    key,
                    key === "done" ? "inProgress" : "todo",
                    index
                  )
                }
                className="bg-gray-600 px-2 rounded hover:bg-gray-500"
              >
                ←
              </button>
            )}

            {/* Move Right */}
            {key !== "done" && (
              <button
                onClick={() =>
                  moveTask(
                    key,
                    key === "todo" ? "inProgress" : "done",
                    index
                  )
                }
                className="bg-gray-600 px-2 rounded hover:bg-gray-500"
              >
                →
              </button>
            )}

            {/* Delete */}
            <button
              onClick={() => deleteTask(key, index)}
              className="bg-red-600 px-2 rounded hover:bg-red-500"
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>

      <button
        onClick={logout}
        className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 mb-6"
      >
        Logout
      </button>

      <div className="mb-8 flex gap-3">
        <input
          type="text"
          placeholder="New Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="bg-gray-700 px-4 py-2 rounded w-64 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-500"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {renderColumn("Todo", "todo")}
        {renderColumn("In Progress", "inProgress")}
        {renderColumn("Done", "done")}
      </div>
    </div>
  )
}
