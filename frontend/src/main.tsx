import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import './assets/styles/index.css';
import '@fontsource/inter/100.css';
import '@fontsource/inter/100-italic.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/200-italic.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/300-italic.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/400-italic.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/500-italic.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/600-italic.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/700-italic.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/800-italic.css';
import '@fontsource/inter/900.css';
import '@fontsource/inter/900-italic.css';
import FontSizeProvider from './06_providers/font-size-provider.tsx';
import ThemeProvider from './06_providers/theme-provider.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ThemeProvider />
      <FontSizeProvider />
      <Toaster position="bottom-left" expand={true} duration={3000} />
    </QueryClientProvider>
  </StrictMode>,
);
