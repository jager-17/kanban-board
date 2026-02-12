import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!username.trim()) return

    localStorage.setItem("user", username)
    navigate("/board")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      
      <div className="bg-gray-800/60 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-[350px]">
        
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login to Kanban
        </h1>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-gray-700 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold"
        >
          Login
        </button>

      </div>
    </div>
  )
}
