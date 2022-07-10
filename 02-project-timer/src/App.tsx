
import { ThemeProvider } from 'styled-components';
import { defaultThemas } from './styles/defaultThemes';
export function App() {

  return (
    <ThemeProvider theme={defaultThemas}>

    </ThemeProvider>
  )
}

