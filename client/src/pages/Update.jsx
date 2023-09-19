import { useState } from 'react';
import { Container } from '@mantine/core';
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import {useParams} from "react-router-dom"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextEditor from '../components/TextEditor';

const Update = () => {
  const {dispatch} =  useNoteContext()
  const {user} = useAuthContext()
  const {id} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function handleUpdate(title, content) {
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

    const response = await axios.put(`http://localhost:4000/api/notes/${id}`, {title, content}, config )
    const json = await response.data
    dispatch({type: "UPDATE_NOTE", payload: json})
    setLoading(false)
    navigate("/home")
   }
  catch(err){
    console.log("Note update error", err)
    setLoading(false)
  }
}


   return (
    <Container m={0} p={20} pt={5} w="95%" fluid>
       <TextEditor type="Update" loading={loading} handleSubmit={handleUpdate}/>
    </Container>
  )
}

export default Update
