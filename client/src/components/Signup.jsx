import { Input, PasswordInput, Button, Text, Title, Stack} from '@mantine/core';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
import { useState } from 'react';
import axios from "axios"

function Signup() {
  const [ loading, setLoading] = useState(false)
  const [ email, setEmail] = useState("")
  const [ password, setPassword] = useState("")
  const [ warnings, setWarnings] = useState([])

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)

    try{
      const response =await axios.post("http://localhost:4000/api/users/signup", {email, password})
      const data = response.json()
      setEmail("")
      setPassword("")
      setLoading(false)
    }
    catch(err){
      console.log("broken ass user auth 🤡", err)
    }

      
  }

  return (

    <Stack spacing="lg" w={300} >
      <Title align='center'>
        <Text >
          Sign Up
        </Text> 
      </Title>
      <Input
        size='md'
        placeholder="Your email"
        value={email}
        onChange={(e) => {setEmail(e.target.value)}}
      />
      <PasswordInput
        size='md'
        placeholder="Password"
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
        // defaultValue="secret"
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
        }
      />
      <Button onClick={handleSignup} fullWidth size='md' loading={loading}>
        Create Account
      </Button>
    </Stack>
  );
}

export default Signup