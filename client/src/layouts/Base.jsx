import { Outlet } from "react-router-dom"
import Nav from "../components/Nav"

const Base = () => {
  return (
    <div className="page">
        <Nav />
        <Outlet />
    </div>
  )
}

export default Base
