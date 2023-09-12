import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { firebaseConfig } from './library/common';
import { FirebaseAppProvider } from 'reactfire';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
)
