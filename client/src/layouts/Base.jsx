import { Outlet } from "react-router-dom"
import SIdeBar from "../components/SIdeBar"

const Base = () => {
  return (
    <div className="page">
      <SIdeBar />
      <Outlet />
    </div>
  )
}

export default Base
