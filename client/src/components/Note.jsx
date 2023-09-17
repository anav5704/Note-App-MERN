import {  Card, Text, Flex, Badge } from '@mantine/core';
import { Link } from "react-router-dom"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Note = ({note, sortCriteria, gridLayout}) => {

  const time = formatDistanceToNow(new Date(sortCriteria == "createdAt" ? note.createdAt : note.updatedAt), {addSuffix : true})

  return (
  <Link to={`/notes/${note._id}`}>
    <Card withBorder p={10}>
        <Text weight={600} size="lg" >
          {note?.title}
        </Text>
        {gridLayout && 
        <Text opacity={.25}>
        {sortCriteria == "createdAt" ? "Created" : "Updated"} {time} ago
        </Text>
        }
      </Card>  
    </Link>
  )
}

export default Note
