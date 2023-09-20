import { IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

const Notify = (title, message, success) => {
  notifications.show({
    withBorder: true,
    title,
    message,
    autoClose: 2500,
    icon: success ? <IconCheck /> : <IconX />,
    color: success ? "green" : "red",
  })
}

export default Notify
