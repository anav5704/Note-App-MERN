import { IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useFetch(){
        const {user} = useAuthContext()
        const { dispatch } = useNoteContext() 
        
        async function fetchNote(id, setTitle, setContent, editor){
            try{
              const config  = {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization" : `Bearer: ${user.token}`
                } 
              }
          
              const response = await axios.get(`http://localhost:4000/api/notes/${id}`, config )
              const json = await response.data
          
              setTitle(json.title)
              setContent(json.content)
              editor.commands.setContent(json.content)
            }
            catch(err){
              console.log("Note fetch error", err)
           
            }
          }
    
    return { fetchNote }
}

export default useFetch