import {BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import PageNotFound from "./components/PageNotFound"
import Hero from "./components/Hero"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Home from "./pages/Home"
 
function App() {
  return (
      <>
        <BrowserRouter>
            <Routes >
                <Route path="/" element={ <Hero /> } />
                <Route path="/signup" element={ <Signup /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/home" element={ <Home /> } />
                <Route path="*" element={ <PageNotFound /> } />
            </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
