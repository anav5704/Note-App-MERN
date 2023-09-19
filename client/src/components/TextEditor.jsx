import { useState, useEffect } from 'react';
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom';
import { TextInput, Flex, Button  } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import axios from 'axios';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {useParams} from "react-router-dom"


const TextEditor = ({type, loading, handleSubmit}) => {
    const {id} = useParams()
    const {user} = useAuthContext()
    const {dispatch} =  useNoteContext()  
    const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

    const editor = useEditor({
        extensions: [
          StarterKit,
          Underline,
          Highlight,
          TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content,
  });

  
  async function handleDelete() {
    setDeleteLoading(true)
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
    setDeleteLoading(false)
    navigate("/home")
   }
  catch(err){
    console.log("Note update error", err)
    setDeleteLoading(false)

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
    if(user && type === "Update"){
      fetchNote()
    }
   }, [dispatch, user, editor])

   return (
        <>
        <Flex align={"center"} justify={"space-between"}>
        <TextInput
          size='xl'
          variant='unstyled'
          placeholder="Note Heading"
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          />
          <Flex align={"center"} justify={"space-between"} gap={15}>
          {type === "Update" &&  <Button loading={deleteLoading} type='submit' onClick={handleDelete} color='red' variant='light' >Delete Note</Button>}
          <Button loading={loading} type='submit' onClick={() => handleSubmit(title, content)}  >{type} Note</Button>
          </Flex>
        </Flex>
            <RichTextEditor style={{border: "none"}} editor={editor} >
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

            <RichTextEditor.Content onInput={() => setContent(editor.getHTML())}/>
        </RichTextEditor>
        </>
  )
}

export default TextEditor
