import { useEffect, useState } from 'react';
import { TextInput, MultiSelect, Button, Container, Flex  } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import {useParams} from "react-router-dom"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const {dispatch} =  useNoteContext()
  const {user} = useAuthContext()
  const {id} = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
 
    const editor = useEditor({
        extensions: [
          StarterKit,
          Underline,
          Highlight,
          TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content ,
  });

  async function handleUpdate(e) {
    e.preventDefault()
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

  async function handleDelete(e) {
    e.preventDefault()
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

    const response = await axios.delete(`http://localhost:4000/api/notes/${id}`, config )
    const json = await response.data
    dispatch({ type: 'DELETE_NOTE', payload: json})
    setLoading(false)
    navigate("/home")
   }
  catch(err){
    console.log("Note update error", err)
    setLoading(false)

  }
}

async function fetchNote(){
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

useEffect(() => {
  if(user){
    fetchNote()
  }
 }, [dispatch, user, editor])

   return (
    <Container m={0} p={20} pt={5} w="95%" fluid>
        <Flex align={"center"} justify={"space-between"} >
       <TextInput
        size='xl'
        variant='unstyled'
        placeholder="Note Heading"
        value={title}
        onChange={(e) => {setTitle(e.target.value)}}
        withAsterisk
        />
        <Flex align={"center"} justify={"space-between"} gap={15}>
          <Button color='red' variant='light' loading={loading} type='submit' onClick={handleDelete}  w={"50%"}>Delete Note</Button>
          <Button loading={loading} type='submit' onClick={handleUpdate}  w={"50%"}>Update Note</Button>
        </Flex>
        </Flex>
        <RichTextEditor style={{border: "none"}} editor={editor}>
            <RichTextEditor.Toolbar  p={0} style={{border: "none"}} onClick={() => setContent( editor.getHTML())}>
                <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />

                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup >
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content onKeyDown={() => setContent(editor.getHTML())}  onInput={() => setContent(editor.getHTML())}/>
        </RichTextEditor>
    </Container>
  )
}

export default Update
