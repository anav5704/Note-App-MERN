import { useEffect, useReducer, createContext } from "react";

const authContext = createContext()

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    const headerConfig = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer: ${state?.user?.token}`
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            dispatch({ type: "LOGIN", payload: user })
        }
    }, [])

    return (
        <authContext.Provider value={{ ...state, headerConfig, dispatch }}>
            {children}
        </authContext.Provider>
    )

}

export { authContext, AuthContextProvider, authReducer }