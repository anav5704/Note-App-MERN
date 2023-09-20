import { IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import {useParams} from "react-router-dom"
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useUpdate(){
        const {user} = useAuthContext()
        const { dispatch } = useNoteContext()
        const {id} = useParams()
        const navigate = useNavigate()
        const [loading, setLoading] = useState(false)
      
        const updateNote = async(title, content) => {
          setLoading(true)
      
          try{
          const config  = {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer: ${user.token}`
            }
          }   

          const response = await axios.put(`http://localhost:4000/api/notes/${id}`, {title, content}, config )
          const json = await response.data
          dispatch({type: "UPDATE_NOTE", payload: json})
          setLoading(false)
          navigate("/home")
          notifications.show({
            withBorder: true,
            title: 'All Good!',
            message: 'Your note was successfully updated',
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
    
    return { updateNote, loading }
}

export default useUpdate