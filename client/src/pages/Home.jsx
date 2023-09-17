import { Menu, Title, SimpleGrid, Container, Loader, Center, Flex, TextInput, ActionIcon } from "@mantine/core";
import { IconSearch, IconAdjustmentsHorizontal, IconLayoutGrid, IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import Note from "../components/Note"
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import useNoteContext from "../hooks/useNoteContext";
import { useEffect, useState } from "react";
 
function Home() {
  const {user} = useAuthContext();
  const {notes, dispatch} = useNoteContext()
  const [filterdNotes, setFilterdNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortCriteria, setSortCriteria]  = useState(localStorage.getItem("sortCritria") || "updatedAt")
  const [sortBy, setSortBy]  = useState(localStorage.getItem("sortBy") || -1)
  const [gridLayout, setGridLayout] = useState(localStorage.getItem("gridLayout") && true)

  async function fetchNotes() {
    try {
      const response = await axios.get("http://localhost:4000/api/notes",{params: {sortCriteria, sortBy},  headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${user.token}`,
      }})
      const notes = await response.data;
      dispatch({type: "SET_NOTES", payload: notes}) 
      console.log(notes)
      setFilterdNotes(notes)
     } catch (err) {
      console.log("Notes fecth error", err);
    }
  }
   
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilterdNotes(filteredNotes)
  };
  
  useEffect(() => {
    if(user){
      fetchNotes()
    }
  }, [user, dispatch, sortCriteria, sortBy]);
  

  const handleSortCriteria = (criteria) => {
    setSortCriteria(criteria)
    localStorage.setItem("sortCritria", criteria)
  }

  const handleSortBy = (by) => {
    setSortBy(by)
    localStorage.setItem("sortBy", by)
  }

  const handleLayout = (layout) => {
    setGridLayout(layout)
    localStorage.setItem("gridLayout", layout === true ? layout : "")
  }

  return (
    <Container m={0} p={20} w="95%" fluid>
      { !filterdNotes?.length ? (
        <Center  h={"100%"} mx="auto">
          <Loader />
        </Center>
      ) : (
        <>
          <Flex align={"start"} justify={"space-between"}>
            <Title mb={20}>Welcome Back 😽</Title>
            <Flex align={"center"} gap={"md"}>
            <TextInput value={searchQuery} onChange={handleSearch}  size="md"  placeholder="Search Notes" icon={<IconSearch  stroke={1.75} size="1.25em" />} />

            <Menu offset={20} shadow="md" width={150} position="bottom-end">
              <Menu.Target>
              <ActionIcon color="blue" size="xl" variant="light" >
                <IconAdjustmentsHorizontal stroke={1.75} size="1.25em"   />
              </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Sort</Menu.Label>
                <Menu.Divider />
                <Menu.Item  onClick={() => handleSortCriteria("title")}>Title</Menu.Item>
                <Menu.Item  onClick={() => handleSortCriteria("createdAt")}>Created</Menu.Item>
                <Menu.Item  onClick={() => handleSortCriteria("updatedAt")}>Updated</Menu.Item>
                <Menu.Divider />
                <Flex>
                  <Menu.Item onClick={() => handleSortBy(1)} p={7}><IconArrowUp width={"100%"}/> </Menu.Item>
                  <Menu.Item onClick={() => handleSortBy(-1)} p={7}><IconArrowDown width={"100%"}/> </Menu.Item>
                </Flex>
               </Menu.Dropdown>
            </Menu>

            <Menu offset={20} shadow="md" width={150} position="bottom-end">
              <Menu.Target>
                <ActionIcon color="blue" size="xl" variant="light" >
                <IconLayoutGrid stroke={1.75} size="1.25em"   />
              </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Layouts</Menu.Label>
                <Menu.Divider />
                <Menu.Item  onClick={() => handleLayout(true)}>Grid</Menu.Item>
                <Menu.Item  onClick={() => handleLayout(false)}>List</Menu.Item>
               </Menu.Dropdown>
            </Menu>



            </Flex>
          </Flex>
          <SimpleGrid  cols={gridLayout ? 4 : 2} spacing="lg">
            {filterdNotes.map((note, index) => (
              <Note key={index} note={note} sortCriteria={sortCriteria} gridLayout={gridLayout}/>
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
}

export default Home;
