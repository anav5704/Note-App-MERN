import { useState } from 'react';
import { Container  } from '@mantine/core';
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom';
import TextEditor from '../components/TextEditor';

import axios from 'axios';

const Create = () => {
  const {user} = useAuthContext()
  const { dispatch } = useNoteContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function handleCreate(title, content) {
    setLoading(true)

    if(!user){
      alert("Not logged in")
    }
    
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
    setLoading(false)
    navigate("/home")
   }
  catch(err){
    console.log("Note creation error", err.response.data)
    setLoading(false)
  }
}

   return (
    <Container m={0} p={20} pt={5} w="95%" fluid>
       <TextEditor type="Create" loading={loading} handleSubmit={handleCreate}/>
    </Container>
  )
}

export default Create
