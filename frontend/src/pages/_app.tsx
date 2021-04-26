import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import AppProvider from "../contexts"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
