import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import Notify from '../utils/notificationHelper';
import axios from 'axios';

function useCreate() {
  const { headerConfig } = useAuthContext()
  const { dispatch } = useNoteContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const createNote = async (title, content) => {
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:4000/api/notes/create", { title, content }, headerConfig)
      const json = await response.data

      dispatch({ type: "CREATE_NOTE", payload: json })
      Notify('All good!', "Your note was successfully created", true)
      navigate("/home")
    }
    catch (err) {
      Notify('Oops!, something went wrong', err.response.data, false)
    }
    finally {
      setLoading(false)
    }
  }

  return { createNote, loading }
}

export default useCreate