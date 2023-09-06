import {  Card, Text, Flex, Badge } from '@mantine/core';
import { Link } from "react-router-dom"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Note = ({note}) => {
  const creationTime = formatDistanceToNow(new Date(note.createdAt), {addSuffix : true})
  function capitalize(string){
    const letter = string.slice(0, 1)
    return letter.toUpperCase() + string.slice(1)
  }

  return (
  <Link to={`/notes/${note._id}`}>
    <Card withBorder p={10}>
        <Text weight={600} size="lg" >
          {note?.title}
        </Text>
        <Text opacity={.25}>
        {capitalize(creationTime)}
        </Text>
        <Flex
          mt="sm"
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
          >
          {note.tags.map((tag, index) => <Badge key={index} variant='filled' radius="sm">{tag}</Badge>)}
          </Flex>
      </Card>  
    </Link>
  )
}

export default Note
