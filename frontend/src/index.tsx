import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App';
import { ContextProvider } from './ContextProvider';

import reportWebVitals from './reportWebVitals';
import './index.css';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
  </BrowserRouter>
);

reportWebVitals();
