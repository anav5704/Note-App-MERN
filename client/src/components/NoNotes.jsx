import { Card, Center, Flex, Text, Button } from '@mantine/core';
import { IconAlertHexagon } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const NoNotes = () => {

  return (
      <Card withBorder p={20} w={350}>
        <Center>
            <Flex direction="column" justify={"center"} align={"center"}>
                <IconAlertHexagon stroke={1.75} size="1.25em" />
                <Text weight={400} size="lg" my={10}>You do not have any notes</Text>
                <Link to="/create">
                    <Button size='md'>Create New Note</Button>
                </Link>
            </Flex>
        </Center>
      </Card>
  )
}

export default NoNotes
