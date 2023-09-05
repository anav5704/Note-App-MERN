import { useEffect, useState } from 'react';
import { TextInput, MultiSelect, Button  } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import useNoteContext from "../hooks/useNoteContext"
import useAuthContext from "../hooks/useAuthContext"
import axios from 'axios';

const Create = () => {
  const {user} = useAuthContext()

  const [title, setTitle] = useState("title")
  const [tags, setTags]= useState(["a" , "b"])
  const [body, setBody] = useState({name: "anav"})


  const [data, setData]= useState([
    { value: 'Study', label: 'Study' },
    { value: 'Movies', label: 'Movies' },
])


  const content = {
    "type": "heading",
    "content": [
      {
        "type": "text",
        "text": "Wow, this editor instance exports its content as JSON."
      }
    ]
  }

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

    if(!user){
      alert("You are not logged in")
      return
  }
  
  try{
    const response = await axios.post("http://localhost:4000/api/notes/create", {title, tags, content})
    const json = await response.data
    console.log(json)
    alert("sumbitted")
  }
  catch(err){
    console.log("Note creation error", err.response.data)
    alert("an error occured")
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
       <MultiSelect
         data={data}
        placeholder="Note Tags"
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => {
            const item = { value: query, label: query };
            setData((current) => [...current, item]);
            return item;
        }}
        />
            <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
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

            <RichTextEditor.Content/>
        </RichTextEditor>
        <Button type='submit' onClick={handleSubmit}  w={"100%"}>Create Note</Button>
    </div>
  )
}

export default Create
