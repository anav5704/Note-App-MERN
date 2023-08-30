import { Input, PasswordInput, Button, Text, Title, Stack} from '@mantine/core';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
import { useState } from 'react';
import axios from "axios"

function Signup() {
  const [ loading, setLoading] = useState(false)
  const [ email, setEmail] = useState("")
  const [ password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      await axios.post("http://localhost:4000/api/users/login", {email, password})
      alert("Registered!")
      setEmail("")
      setPassword("")
      setLoading(false)
    }
    catch(err){
      console.log("Frontend loging error", err)
    }
  }

  return (

    <Stack spacing="lg" w={300} >
      <Title align='center'>
        <Text >
          Log In
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
      <Button onClick={handleLogin} fullWidth size='md' loading={loading}>
        Log In
      </Button>
    </Stack>
  );
}

export default Signup