import { IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useState } from "react"
import useAuthContest from "./useAuthContext"
import axios from "axios"

function useSignup(){
    const [ loading, setLoading] = useState(false)
    const {dispatch} = useAuthContest()
    
    const signup = async (email, password) => {
        setLoading(true)
        try{
            const response = await axios.post("http://localhost:4000/api/users/signup", {email, password})
            const json = await response.data
            localStorage.setItem("user", JSON.stringify(json))
            dispatch({type: "LOGIN", payload: json})
            notifications.show({
              withBorder: true,
              title: 'Congratulations!',
              message: 'You were successfuly registered',
              autoClose: 2500,
              icon: <IconCheck />,
              color: 'green',
             })
            setLoading(false)
          }
          catch(err){
            notifications.show({
              withBorder: true,
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

      return {signup, loading}

}
 
export default useSignup