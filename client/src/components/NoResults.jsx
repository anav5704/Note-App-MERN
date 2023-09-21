import { Card, Center, Flex, Text } from '@mantine/core';
import { IconAlertHexagon } from '@tabler/icons-react';

const NoResults = ({query}) => {

  return (
      <Card withBorder p={20} w={350}>
        <Center>
            <Flex direction="column" justify={"center"} align={"center"}>
                <IconAlertHexagon stroke={1.75} size="1.25em" />
                <Text weight={400} size="lg" mt={10}>No notes titled "{query}" found</Text>
            </Flex>
        </Center>
      </Card>
  )
}

export default NoResults
