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
      return {
        notes: state.notes.map(n => n._id === action.payload._id ? action.payload : n)
      }
    default:
      return state
  }
}

const NotesConetextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, { notes: [] })
  return (
    <noteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </noteContext.Provider>
  )
}

export { noteContext, NotesConetextProvider, noteReducer }