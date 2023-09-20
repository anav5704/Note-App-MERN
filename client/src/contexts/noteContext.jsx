import { createContext, useReducer } from "react";

const noteContext = createContext()

const noteReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTES":
            return {
                notes: action.payload
            }
        case "CREATE_NOTE":
            return {
                notes: [action.payload, ...state.notes]
            }
        case "DELETE_NOTE":
            return {
                notes: state.notes.filter((n) => n._id !== action.payload._id)
            }
        case "UPDATE_NOTE":
            const updatednotes = state.notes.map((n) => {
                if (n._id === action.payload._id) {
                    return action.payload;
                }
                return n;
            });
            return {
                notes: updatednotes
            };
        default:
            return state
    }
}

const NotesConetextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(noteReducer, { notes: [] })
    return (
        < noteContext.Provider value={{ ...state, dispatch }}>
            {children}
        </noteContext.Provider>
    )
}

export { noteContext, NotesConetextProvider, noteReducer }