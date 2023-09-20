import { Container } from '@mantine/core';
import useUpdate from '../hooks/useUpdate';
import TextEditor from '../components/TextEditor';
import useDelete from '../hooks/useDelete';

const Update = () => {
  const { updateNote, loading } = useUpdate()
  const { deleteNote, deleteLoading } = useDelete()

  async function handleUpdate(title, content) {
    await updateNote(title, content)
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
