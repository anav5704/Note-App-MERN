import { IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useCreate(){
        const {user} = useAuthContext()
        const { dispatch } = useNoteContext()
        const navigate = useNavigate()
        const [loading, setLoading] = useState(false)
      
        const createNote = async(title, content) => {
          setLoading(true)
      
          try{
          const config  = {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer: ${user.token}`
            }
          }   

          const response = await axios.post("http://localhost:4000/api/notes/create", {title, content}, config )
          const json = await response.data
          dispatch({type: "CREATE_NOTE", payload: json})
          console.log(json)
          notifications.show({
            withBorder: true,
            title: 'All Good!',
            message: 'A new note was successfully created',
            autoClose: 2500,
            icon: <IconCheck />,
            color: 'green',
            })
          setLoading(false)
          navigate("/home")
         }
        catch(err){
            setLoading(false)
          console.log("Note creation error", err.response.data)
          notifications.show({
            withBorder: true,
            title: 'Oops!, something went wrong',
            message: err.response.data,
            autoClose: 2500,
            icon: <IconX />,
            color: 'red',
        })
      }
    }
    
    return { createNote, loading }
}

export default useCreate