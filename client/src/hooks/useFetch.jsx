import useAuthContext from "../hooks/useAuthContext"
import axios from 'axios';

function useFetch() {
  const { headerConfig } = useAuthContext()

  async function fetchNote(id, setTitle, setContent, editor) {
    try {
      const response = await axios.get(`http://localhost:4000/api/notes/${id}`, headerConfig)
      const json = await response.data

      setTitle(json.title)
      setContent(json.content)
      editor.commands.setContent(json.content)
    }
    catch (err) {
      console.log(err)
    }
  }

  return { fetchNote }
}

export default useFetch