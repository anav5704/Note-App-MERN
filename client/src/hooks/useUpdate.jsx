import { useParams, useNavigate } from "react-router-dom"
import { useState } from 'react';
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import Notify from '../utils/notificationHelper';
import axios from 'axios';

function useUpdate() {
  const { headerConfig } = useAuthContext()
  const { dispatch } = useNoteContext()
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const updateNote = async (title, content) => {
    setLoading(true)

    try {
      const response = await axios.put(`http://localhost:4000/api/notes/${id}`, { title, content }, headerConfig)
      const json = await response.data
    
      dispatch({ type: "UPDATE_NOTE", payload: json })
      Notify('All good!', "Your note was successfully updated", true)
      navigate("/home")
    }
    catch (err) {
      Notify('Oops!, something went wrong', err.response.data, false)
    }
    finally {
      setLoading(false)
    }
  }

  return { updateNote, loading }
}

export default useUpdate