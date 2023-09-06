import { useEffect, useReducer, createContext } from "react";

const authContext = createContext()

const authReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return { user : action.payload }
        case "LOGOUT":
            return { user : null }
        default:
            return state
    }
}

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

     useEffect(() => {
        const json = JSON.parse(localStorage.getItem("user"))
        if(json){
            dispatch({type: "LOGIN", payload: json}) 
         }
    }, []) 

    console.log("Auth Context State: ", state)

    return (
        <authContext.Provider value={{...state, dispatch}}>
            {children}
        </authContext.Provider>
    )

}

export {authContext, AuthContextProvider, authReducer}