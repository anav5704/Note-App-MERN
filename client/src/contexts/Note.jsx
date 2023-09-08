import {  Card, Text, Flex, Badge } from '@mantine/core';
import { Link } from "react-router-dom"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Note = ({note, sortCriteria, gridLayout}) => {

  const time = formatDistanceToNow(new Date(sortCriteria == "createdAt" ? note.createdAt : note.updatedAt), {addSuffix : true})

  return ( gridLayout ? 
  <Link to={`/notes/${note._id}`}>
    <Card withBorder p={10}>
        <Text weight={600} size="lg" >
          {note?.title}
        </Text>
        <Text opacity={.25}>
        {sortCriteria == "createdAt" ? "Created" : "Updated"} {time} ago
        </Text>
        <Flex
          mt="sm"
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
          >
          {note.tags.map((tag, index) => <Badge key={index} variant='light' radius="sm">{tag}</Badge>)}
          </Flex>
      </Card>  
    </Link>
    :
    <Link to={`/notes/${note._id}`} >
    <Card withBorder p={10}>
      <Flex align={"center"} justify={"space-between"}>
        <Text weight={600} size="lg" >
          {note?.title}
        </Text>
        <Flex
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
          >
          {note.tags.map((tag, index) => <Badge key={index} variant='light' radius="sm">{tag}</Badge>)}
          </Flex>      
          </Flex>
      </Card>  
    </Link>
  )
}

export default Note
