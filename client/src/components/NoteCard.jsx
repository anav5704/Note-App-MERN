import { Card, Text, Flex } from '@mantine/core';
import { Link } from "react-router-dom"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const NoteCard = ({ note, sortCriteria, gridLayout }) => {
  const time = formatDistanceToNow(new Date(sortCriteria == "createdAt" ? note.createdAt : note.updatedAt), { addSuffix: true })

  return (
    <Link to={`/notes/${note._id}`}>
      <Card withBorder p={10}>
        <Text weight={600} size="lg" >
          {note?.title}
        </Text>
        {gridLayout &&
          <Text opacity={.50}>
            {sortCriteria == "createdAt" ? "Created" : "Updated"} {time}
          </Text>
        }
      </Card>
    </Link>
  )
}

export default NoteCard
