import {BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import Hero from "./components/Hero"
import Signup from "./components/Signup"
import Login from "./components/Login"

function App() {


  return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Hero /> } />
                <Route path="/signup" element={ <Signup /> } />
                <Route path="/login" element={ <Login /> } />
            </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
