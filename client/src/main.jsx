import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import Maintine from './Maintine'
import {AuthContextProvider} from "./contexts/authContext"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
          <AuthContextProvider>
      <MantineProvider withNormalizeCSS withGlobalStyles theme={{ colorScheme: 'dark' }}>
        <Notifications />
            <Maintine />
        </MantineProvider>
          </AuthContextProvider>
    </React.StrictMode>,
)
