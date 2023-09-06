import {  Card, Text, Flex, Badge } from '@mantine/core';

const Note = ({note}) => {
  return (
    <Card withBorder p={10}>
          <Text weight={600} size="lg" >
            {note?.title}
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
  )
}

export default Note
