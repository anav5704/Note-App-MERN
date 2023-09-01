import {authContext} from "../contexts/authContext";
import { useContext } from "react";

const useAuthContext = () => {
    const context = useContext(authContext) 

    if (!context) {
        throw Error("Auth Context Broken") 
    }   
    
    return context
}

export default useAuthContext 