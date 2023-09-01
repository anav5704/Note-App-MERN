import { IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useState } from "react"
 import useAuthContext from './useAuthContext';
import axios from "axios"

function useLogin(){
    const [ loading, setLoading] = useState(false)
    const {dispatch} = useAuthContext()
 
    const login = async (email, password) => {
        setLoading(true)
         try{
            const response = await axios.post("http://localhost:4000/api/users/login", {email, password})
            const json = await response.data
            localStorage.setItem("user", JSON.stringify(json))
            dispatch({type: "LOGIN", payload: json})
            console.log(json.user)
            notifications.show({
                withBorder: true,
                title: 'Welcome back!',
                message: 'You were successfuly logged in',
                autoClose: 2500,
                icon: <IconCheck />,
                color: 'green',
                })
            setLoading(false)
           }
        catch(err){
            console.log(err.response.data)
            setLoading(false)
            notifications.show({
            withBorder: true,
            title: 'Oops!, something went wrong',
            message: err.response.data,
            autoClose: 2500,
            icon: <IconX />,
            color: 'red',
            })
        } 
      }

      return {login, loading}
}
 
export default useLogin