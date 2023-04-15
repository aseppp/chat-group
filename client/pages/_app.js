import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/globals.css';
import Layout from './layout';
import theme from '@/styles/theme.js';
import { UserContextProvider } from './context';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
