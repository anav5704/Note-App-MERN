import { Input, PasswordInput, Button, Text, Title, Stack} from '@mantine/core';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
import { useState } from 'react';

function Signup() {
  const [ loading, setLoading] = useState(false)
  const [ email, setEmail] = useState("")
  const [ password, setPassword] = useState("")

  const handdleSignup = () => {
    setLoading(true)
    console.log(email, password)
    setTimeout(() => {
      setLoading(false)
      setEmail("")
      setPassword("")
    }, 2500)
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
      <Button onClick={handdleSignup} fullWidth size='md' loading={loading}>
        Log In
      </Button>
    </Stack>
  );
}

export default Signup