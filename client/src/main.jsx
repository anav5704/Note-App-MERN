import { AuthContextProvider } from "./contexts/authContext"
import { NotesConetextProvider } from './contexts/noteContext'
import { MantineProvider } from '@mantine/core'
import Maintine from './Maintine'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotesConetextProvider>
        <MantineProvider withNormalizeCSS withGlobalStyles theme={{ colorScheme: 'red' }}>
          <Maintine />
        </MantineProvider>
      </NotesConetextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
