import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '@/app/store';

import '@/styles/globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App({ Component, pageProps }) {
  const queryClient = React.useRef(new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydrateState}>
          <Component {...pageProps} />
          <ReactQueryDevtools></ReactQueryDevtools>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}
