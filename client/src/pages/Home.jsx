import { Title, SimpleGrid, Container, Loader, Center, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard"
import NoResults from "../components/NoResults";
import NoNotes from "../components/NoNotes";
import SearchFilter from "../components/SearchFilter";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import useNoteContext from "../hooks/useNoteContext";
import useNotePreferences from "../hooks/useNotePreferences";

function Home() {
  const { user, headerConfig: { headers } } = useAuthContext();
  const { notes, dispatch } = useNoteContext()
  const [filterdNotes, setFilterdNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const { handleSortCriteria, sortCriteria, handleSortBy, sortBy, handleLayout, gridLayout } = useNotePreferences()

  async function fetchNotes() {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:4000/api/notes", { params: { sortCriteria, sortBy }, headers })
      const notes = await response.data;

      dispatch({ type: "SET_NOTES", payload: notes })
      setFilterdNotes(notes)
    }
    catch (err) {
      console.log("Notes fecth error", err);
    }
    finally {
      setLoading(false)
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
    if (user) {
      fetchNotes()
    }
  }, [user, dispatch, sortCriteria, sortBy]);

  return (
    <Container m={0} p={20} w="95%" fluid>
      {loading ? (
        <Center h={"100%"} mx="auto">
          <Loader />
        </Center>
      ) : (
        <>
          <Flex align={"start"} justify={"space-between"}>
            <Title mb={20}>Welcome Back</Title>
            <SearchFilter
              handleSearch={handleSearch}
              searchQuery={searchQuery}
              handleSortCriteria={handleSortCriteria}
              handleSortBy={handleSortBy}
              handleLayout={handleLayout}
            />
          </Flex>
          {!notes.length ? (
            <Center h={"85%"} mx="auto">
              <NoNotes />
            </Center>
          ) : !filterdNotes.length ? (
            <Center h={"85%"} mx="auto">
              <NoResults query={searchQuery} />
            </Center>
          ) : (
            <SimpleGrid cols={gridLayout ? 4 : 2} spacing="lg">
              {filterdNotes.map((note, index) => (
                <NoteCard key={index} note={note} sortCriteria={sortCriteria} gridLayout={gridLayout} />
              ))}
            </SimpleGrid>
          )}
        </>
      )}
    </Container>
  );
}

export default Home;
