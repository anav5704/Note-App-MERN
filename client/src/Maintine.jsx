import { Notifications } from '@mantine/notifications'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import App from './App';

function Maintine() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = () => setColorScheme((colorScheme === 'dark' ? 'light' : 'dark'));
  useHotkeys([['mod+M', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Notifications />
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default Maintine