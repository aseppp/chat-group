import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/globals.css';
import Layout from './layout';
import theme from '@/styles/theme.js';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
