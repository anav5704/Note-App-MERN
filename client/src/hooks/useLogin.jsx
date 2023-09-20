import { useState } from "react"
import useAuthContext from './useAuthContext';
import axios from "axios"
import Notify from "../utils/notificationHelper";

function useLogin() {
    const [loading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:4000/api/users/login", { email, password })
            const json = await response.data

            localStorage.setItem("user", JSON.stringify(json))
            dispatch({ type: "LOGIN", payload: json })
            Notify('Welcome back!', "You were successfully logged in", true)
        }
        catch (err) {
            Notify('Oops!, something went wrong', err.response.data, false)
        }
        finally {
            setLoading(false)
        }
    }

    return { login, loading }
}

export default useLogin