import './index.css'
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import PageNotFound from "./components/PageNotFound"
import Base from "./layouts/Base"
import Hero from "./components/Hero"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Home from "./pages/Home"
import Create from './pages/Create'
import Update from "./pages/Update"
import useAuthContext from './hooks/useAuthContext'
   
function App() {
  const {user} = useAuthContext()
 
  return (
      <>
        <BrowserRouter>
            <Routes >
                <Route path="/" element={ user ? <Navigate to="/home" /> : <Hero /> } />
                <Route path="/signup" element={ user ? <Navigate to="/home" />: <Signup /> } />
                <Route path="/login" element={ user ? <Navigate to="/home" /> : <Login /> } />
                <Route element={<Base />}>
                  <Route path="/home" element={ user ? <Home /> : <Navigate to="/" /> } />
                  <Route path="/create" element={ user ? <Create /> : <Navigate to="/" /> } />
                  <Route path="/notes/:id" element={ <Update /> } />
                </Route>
                <Route path="*" element={ <PageNotFound /> } />
            </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
