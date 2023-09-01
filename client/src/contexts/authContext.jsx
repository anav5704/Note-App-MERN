const { createContext, useEffect } = require("react");
import useSignup from "../hooks/useSignup";

const authContext = createContext()

const authContextProvider = ({children}) => {
    const {signup} = useSignup()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("User"))
        if(user){
            signup()
        }
    }, []) 

    return (
        <authContext.Provider>
            {children}
        </authContext.Provider>
    )

}

export {authContext, authContextProvider}