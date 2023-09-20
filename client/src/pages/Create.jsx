import { Container } from '@mantine/core';
import TextEditor from '../components/TextEditor';
import useCreate from '../hooks/useCreate';

const Create = () => {
  const { createNote, loading } = useCreate()

  async function handleCreate(title, content) {
    await createNote(title, content)
  }

  return (
    <Container m={0} p={20} pt={5} w="95%" fluid>
      <TextEditor type="Create" loading={loading} handleSubmit={handleCreate} />
    </Container>
  )
}

export default Create
