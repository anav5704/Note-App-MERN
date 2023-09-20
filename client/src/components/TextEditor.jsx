import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { TextInput, Flex, Button } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import useAuthContext from "../hooks/useAuthContext"
import useNoteContext from "../hooks/useNoteContext"
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import useFetch from '../hooks/useFetch';


const TextEditor = ({ type, loading, deleteLoading, handleSubmit, handleDelete }) => {
  const { id } = useParams()
  const { user } = useAuthContext()
  const { dispatch } = useNoteContext()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { fetchNote } = useFetch()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  useEffect(() => {
    if (user && type === "Update") {
      fetchNote(id, setTitle, setContent, editor)
    }
  }, [dispatch, user, editor])

  return (
    <>
      <Flex align={"center"} justify={"space-between"} mt={10}>
        <TextInput
          size='xl'
          w={500}
          variant='unstyled'
          placeholder="Note Heading Goes Here"
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />
        <Flex align={"center"} justify={"space-between"} gap={15}>
          {type === "Update" && <Button size='md' loading={deleteLoading} type='submit' onClick={() => handleDelete(id)} color='red' variant='light' >Delete Note</Button>}
          <Button size='md' loading={loading} type='submit' onClick={() => handleSubmit(title, content)}  >{type} Note</Button>
        </Flex>
      </Flex>
      <RichTextEditor style={{ border: "none" }} editor={editor} >
        <RichTextEditor.Toolbar mt={25} sx={{ display: "flex", justifyContent: 'center' }} p={0} style={{ border: "none" }} onClick={() => setContent(editor.getHTML())}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold w={40} h={40} />
            <RichTextEditor.Italic w={40} h={40} />
            <RichTextEditor.Underline w={40} h={40} />
            <RichTextEditor.Strikethrough w={40} h={40} />
            <RichTextEditor.ClearFormatting w={40} h={40} />
            <RichTextEditor.Highlight w={40} h={40} />
            <RichTextEditor.Code w={40} h={40} />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 w={40} h={40} />
            <RichTextEditor.H2 w={40} h={40} />
            <RichTextEditor.H3 w={40} h={40} />
            <RichTextEditor.H4 w={40} h={40} />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList w={40} h={40} />
            <RichTextEditor.OrderedList w={40} h={40} />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup >
            <RichTextEditor.AlignLeft w={40} h={40} />
            <RichTextEditor.AlignCenter w={40} h={40} />
            <RichTextEditor.AlignRight w={40} h={40} />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content onInput={() => setContent(editor.getHTML())} />
      </RichTextEditor>
    </>
  )
}

export default TextEditor
