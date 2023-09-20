import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import Notify from '../utils/notificationHelper'
import axios from 'axios'

function useDelete() {
  const { headerConfig } = useAuthContext()
  const { dispatch } = useNoteContext()
  const navigate = useNavigate()
  const [deleteLoading, setDeleteLoading] = useState(false)

  const deleteNote = async (id) => {
    setDeleteLoading(true)

    try {
      const response = await axios.delete(`http://localhost:4000/api/notes/${id}`, headerConfig)
      const json = await response.data

      dispatch({ type: 'DELETE_NOTE', payload: json })
      Notify('All good!', "Your note was successfully deleted", true)
      navigate("/home")
    }
    catch (err) {
        Notify('Oops!, something went wrong', err.response.data, false)
      }
    finally {
      setDeleteLoading(false)
    }
  }

  return { deleteNote, deleteLoading }
}

export default useDelete