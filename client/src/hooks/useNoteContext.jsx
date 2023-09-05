import { noteContext } from "../contexts/noteContext";
import { useContext } from "react";

const useNoteContext = () => {
    const context = useContext(noteContext)

    if (!context) {
        throw Error("Note context broken") 
    }   
    
    return useNoteContext
}

export default useNoteContext