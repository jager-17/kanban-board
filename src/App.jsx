import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Board from "./pages/Board"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  )
}
