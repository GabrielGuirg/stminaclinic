import { useRef } from 'react';
import './App.css';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

function App() {
  let toast = useRef<Toast>(null);

    const show = () => {
      toast.current?.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    };

  return (
    <div className="App">
      Home Page
      
      <Toast ref={toast} />
            <Button onClick={show} label="Show" />
    </div>
  );
}

export default App;
