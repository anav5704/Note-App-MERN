import { Input, PasswordInput, Button , Text, Title, Stack} from '@mantine/core';
import { IconEyeCheck, IconEyeOff, IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import {Link} from "react-router-dom"
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
      notifications.show({
        title: 'Welcome back!',
        message: 'You were successfuly logged in',
        autoClose: 2500,
        icon: <IconCheck />,
        color: 'green',
       })
      setLoading(false)
    }
    catch(err){
      notifications.show({
        title: 'Oops!, something went wrong',
        message: err.response.data,
        autoClose: 2500,
        icon: <IconX />,
        color: 'red',
       })
      console.log(err.response.data)
      setLoading(false)
    } 
  }

  return (
    <>
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
    <Text mt={15} align='center'>Don't have an account? <Link className='link' to="/signup">Sign Up</Link></Text>
    </>
  );
}

export default Signup