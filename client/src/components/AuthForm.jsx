import { Input, PasswordInput, Button, Text, Title, Stack } from '@mantine/core';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
import { Link } from "react-router-dom"
import { useState } from 'react';

function AuthForm({ type, handleSubmit, loading }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      <Stack spacing="lg" w={300} >
        <Title align='center'>
          <Text >
            {type === "LogIn" ? "Log In" : "Sign Up"}
          </Text>
        </Title>
        <Input 
          name='email'
          size='md'
          placeholder="Your email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <PasswordInput
          name='password'
          size='md'
          placeholder={`${type === "SignUp" ? "New" : ""} Password`}
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
          }
        />
        <Button onClick={() => handleSubmit(email, password)} fullWidth size='md' loading={loading}>
          {type === "LogIn" ? "Log In" : "Create Account"}
        </Button>
      </Stack>
      {type === "LogIn" ?
        <Text mt={15} align='center'>Don't have an account? <Link className='link' to="/signup">Sign Up</Link></Text>
        :
        <Text mt={15} align='center'>Already have an account? <Link className='link' to="/login">Log In</Link></Text>
      }
    </>
  );
}

export default AuthForm