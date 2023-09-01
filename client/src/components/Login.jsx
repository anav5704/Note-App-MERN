import { Input, PasswordInput, Button , Text, Title, Stack} from '@mantine/core';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
 import {Link} from "react-router-dom"
import { useState } from 'react';
import useLogin from '../hooks/useLogin';

function Signup() {
  const [ email, setEmail] = useState("")
  const [ password, setPassword] = useState("")
  const {login, loading} = useLogin()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(email, password)

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