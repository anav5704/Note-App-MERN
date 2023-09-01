import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications'
import useAuthContext from "./useAuthContext"

function useLogout(){
    const {dispatch} = useAuthContext()

    const logout = () => {
        localStorage.removeItem("user")
        dispatch({type: "LOGOUT"})
        notifications.show({
            withBorder: true,
            title: 'Bye bye!',
            message: 'You were successfuly logged out',
            autoClose: 2500,
            icon: <IconCheck />,
            color: 'green',
            })
        }

    return {logout}
}

export default useLogout