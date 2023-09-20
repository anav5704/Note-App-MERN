import { IconX, IconCheck } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import axios from 'axios'

function useDelete() {
  const { user } = useAuthContext()
  const { dispatch } = useNoteContext()
  const navigate = useNavigate()
  const [deleteLoading, setDeleteLoading] = useState(false)

  const deleteNote = async (id) => {
    setDeleteLoading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer: ${user.token}`
        }
      }

      const response = await axios.delete(`http://localhost:4000/api/notes/${id}`, config)
      const json = await response.data
      dispatch({ type: 'DELETE_NOTE', payload: json })
      notifications.show({
        withBorder: true,
        title: 'All Good!',
        message: 'Your note was succesfully deleted',
        autoClose: 2500,
        icon: <IconCheck />,
        color: 'green',
      })
      setDeleteLoading(false)
      navigate("/home")
    }
    catch (err) {
      console.log("Note delete error", err)
      notifications.show({
        withBorder: true,
        title: 'Oops!, something went wrong',
        message: err.response.data.error,
        autoClose: 2500,
        icon: <IconX />,
        color: 'red',
      })
      setDeleteLoading(false)

    }
  }

  return { deleteNote, deleteLoading }
}

export default useDelete