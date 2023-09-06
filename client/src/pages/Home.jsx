import { Title, SimpleGrid, Container, Loader, Center } from "@mantine/core";
import Note from "../contexts/Note";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

function Home() {
  const { user } = useAuthContext();

  const [notes, setNotes] = useState([]);

  async function fetchNotes() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${user.token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:4000/api/notes",
        config
      );
      const notes = await response.data;
      setNotes(notes);
    } catch (err) {
      console.log("Notes fecth error", err.response.data);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container m={0} p={20} w="95%" fluid>
      { !notes.length ? (
        <Center  h={"100%"} mx="auto">
          <Loader />
        </Center>
      ) : (
        <>
          <Title mb={20}>Welcome Back 😽</Title>
          <SimpleGrid cols={4} spacing="lg">
            {notes.map((note, index) => (
              <Note key={index} note={note} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
}

export default Home;
