import { Input, PasswordInput, Button , Text, Title, Stack} from '@mantine/core';
import { IconEyeCheck, IconEyeOff, IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react';
import useSignup from '../hooks/useSignup';
import axios from "axios"

function Signup() {
   const [ email, setEmail] = useState("")
  const [ password, setPassword] = useState("")
  const  {signup, loading} = useSignup()
  
  const handleSignup = async (e) => {
    e.preventDefault()
    await signup(email, password)
  }

  return (
    <>
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
    <Text mt={15} align='center'>Already have an account? <Link className='link' to="/login">Login</Link></Text>
    </>
  );
}

export default Signup