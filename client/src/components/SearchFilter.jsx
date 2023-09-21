import { IconSearch, IconAdjustmentsHorizontal, IconLayoutGrid, IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import { Menu, Flex, TextInput, ActionIcon } from "@mantine/core";


const SearchFilter = ({ handleSearch, searchQuery, handleSortCriteria, handleSortBy, handleLayout }) => {
  return (
    <Flex align={"center"} gap={"md"}>
      <TextInput value={searchQuery} onChange={handleSearch} w={300} size="md" placeholder="Search Notes" icon={<IconSearch stroke={1.75} size="1.25em" />} />

      <Menu offset={20} shadow="md" width={150} position="bottom-end">
        <Menu.Target>
          <ActionIcon color="blue" size="xl" variant="filled" >
            <IconAdjustmentsHorizontal stroke={1.75} size="1.25em" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Sort</Menu.Label>
          <Menu.Divider />
          <Menu.Item onClick={() => handleSortCriteria("title")}>Title</Menu.Item>
          <Menu.Item onClick={() => handleSortCriteria("createdAt")}>Created</Menu.Item>
          <Menu.Item onClick={() => handleSortCriteria("updatedAt")}>Updated</Menu.Item>
          <Menu.Divider />
          <Flex>
            <Menu.Item onClick={() => handleSortBy(1)} p={7}><IconArrowUp width={"100%"} /> </Menu.Item>
            <Menu.Item onClick={() => handleSortBy(-1)} p={7}><IconArrowDown width={"100%"} /> </Menu.Item>
          </Flex>
        </Menu.Dropdown>
      </Menu>

      <Menu offset={20} shadow="md" width={150} position="bottom-end">
        <Menu.Target>
          <ActionIcon color="blue" variant="filled" size="xl"  >
            <IconLayoutGrid stroke={1.75} size="1.25em" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Layouts</Menu.Label>
          <Menu.Divider />
          <Menu.Item onClick={() => handleLayout(true)}>Grid</Menu.Item>
          <Menu.Item onClick={() => handleLayout(false)}>List</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>

  )
}

export default SearchFilter
