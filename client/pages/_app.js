import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/globals.css';
import Layout from './layout';
import theme from '@/styles/theme.js';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
