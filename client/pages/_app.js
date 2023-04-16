import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/globals.css';
import Layout from './layout';
import theme from '@/styles/theme.js';
import { UserContextProvider } from './context';
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
          <UserContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserContextProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
