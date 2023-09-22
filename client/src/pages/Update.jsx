import { Container } from '@mantine/core';
import { useParams } from 'react-router-dom';
import useNoteController from '../hooks/useNoteController';
import TextEditor from '../components/TextEditor';

const Update = () => {
  const { updateNote, loading, deleteNote, deleteLoading } = useNoteController()
  const { id } = useParams()

  async function handleUpdate(title, content) {
    await updateNote(title, content, id)
  }

  async function handleDelete(id) {
    await deleteNote(id)
  }

  return (
    <Container m={0} p={20} pt={5} w="95%" fluid>
      <TextEditor
        type="Update"
        loading={loading}
        deleteLoading={deleteLoading}
        handleSubmit={handleUpdate}
        handleDelete={handleDelete}
      />
    </Container>
  )
}

export default Update
