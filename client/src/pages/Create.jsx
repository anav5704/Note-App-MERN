import { useState } from 'react';
import { TextInput, Flex, Button, Container  } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Create = () => {
  const {user} = useAuthContext()
  const { dispatch } = useNoteContext()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setConetent] = useState(null)
  const [loading, setLoading] = useState(false)

    const editor = useEditor({
        extensions: [
          StarterKit,
          Underline,
          Highlight,
          TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content,
  });

  async function handleSubmit(e) {
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
        <Flex align={"center"} justify={"space-between"}>
        <TextInput
        size='xl'
          variant='unstyled'
          placeholder="Note Heading"
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          withAsterisk
          />
          <Button loading={loading} type='submit' onClick={handleSubmit}  >Create Note</Button>
        </Flex>
            <RichTextEditor style={{border: "none"}} editor={editor}>
            <RichTextEditor.Toolbar  p={0} style={{border: "none"}} onClick={() => setConetent( editor.getHTML())}>
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

            <RichTextEditor.Content  onInput={() => setConetent(editor.getHTML())}/>
        </RichTextEditor>
    </Container>
  )
}

export default Create
