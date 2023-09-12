import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home/Home';
import Behavioral from './Behavioral/Behavioral';
import Dashboard from './Dashboard/Dashboard';
import Login from './login/Login';
import { Toast, ToastMessage } from 'primereact/toast';
import { useEffect, useRef } from 'react';
import { generalStore } from './stores/generalStore';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';

import './App.css';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getFirestore } from 'firebase/firestore';

function App() {
  const toast = useRef<Toast>(null);
  const toasts = generalStore((state: any) => state.toasts);
  const appLoading = generalStore((state: any) => state.appLoading);
  const app = useFirebaseApp();

  useEffect(() => {
    if (toasts != null) {
      for (const t of toasts) {
        toast.current?.show(t as ToastMessage);
      }
    }
  }, [toasts]);
  const firestoreInstance = getFirestore(app);
  
  return (
        <div className="app">
            <BlockUI blocked={appLoading} fullScreen ></BlockUI>
            <FirestoreProvider sdk={firestoreInstance}>
              <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="Behavioral" element={<Behavioral />} /> 
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="Dashboard" element={<Dashboard />} /> 
                  </Routes>
              </BrowserRouter>
            </FirestoreProvider>
            <Toast ref={toast} />
        </div>
  );
}

export default App;
