import { Button } from 'primereact/button';
import { generalStore } from '../stores/generalStore';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';


function Home() {
    const sendToasts = generalStore((state: any) => state.sendToasts);
    const setLoading = generalStore((state: any) => state.setLoading);
    const add = generalStore((state: any) => state.addName);
    const names = generalStore((state: any) => state.names);
    const getNames = generalStore((state: any) => state.getNames);
    const deleteName = generalStore((state: any) => state.deleteName)
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        getNames();
    }, [])
    console.log(names);
    
    const show = () => {
        sendToasts([
            {severity:'success', summary: 'Success', detail:'Message Content', life: 3000},
            {severity:'error', summary: 'Error', detail:'Message Content', life: 3000}
        ]);
    };

  return (
    <div className="Home">
      Home Page
    <InputText value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
     <Button onClick={show} label="Show" />
     <Button onClick={() => {
        add(value);
     }} label="add" />

     <Button onClick={() => {
        console.log('clicked');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
     }} label="loading" />

     {
        names.map((n) => <div key={n.id}>
            {n['name']} <Button onClick={() => deleteName(n.id)} label="delete" link></Button>
        </div>)
     }
    </div>
  );
}

export default Home;
