import { useState } from 'react';
import { TextInput, Select, Button  } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
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
          Link,
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
    <div>
       <TextInput
        placeholder="Note Heading"
        value={title}
        onChange={(e) => {setTitle(e.target.value)}}
        withAsterisk
        />
            <RichTextEditor  editor={editor} >
            <RichTextEditor.Toolbar sticky stickyOffset={60} onClick={() => setConetent( editor.getHTML())}>
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

                <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup >
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content onInput={() => setConetent(editor.getHTML())}/>
        </RichTextEditor>
        <Button loading={loading} type='submit' onClick={handleSubmit}  w={"100%"}>Create Note</Button>
    </div>
  )
}

export default Create
