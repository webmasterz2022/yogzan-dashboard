'use client';

import { Provider } from 'react-redux';
import store from '../store';
import AppContextProvider from '../contexts';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppContextProvider>{children}</AppContextProvider>
    </Provider>
  );
}
