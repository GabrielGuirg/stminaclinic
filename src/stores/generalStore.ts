import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore';
import { ToastMessage } from 'primereact/toast'
import { create } from 'zustand'
import { firebaseApp } from '../library/common';

export const generalStore = create((set, get: any) => ({
  toasts: null,
  appLoading: false,
  names: [],
  sendToasts: (allToasts: ToastMessage[]) => {
    set((state: any) => ({
        ...state, // state here expands states
        toasts: allToasts
    }));
  },
  setLoading: (val: boolean) => {
    set((state: any) => ({
        ...state,
        appLoading: val
    }));
  },
  addName: async (val: string) => {
    set((state: any) => ({
        ...state,
        appLoading: true
    }));
    const db = getFirestore(firebaseApp);
    const docRef = collection(db, "names");
    const res = await addDoc(docRef, {
        name: val
    });
    console.log(res);
    set((state: any) => ({
        ...state,
        appLoading: false
    }));
    get().getNames();
  },
  getNames: async () => {
    const db = getFirestore(firebaseApp);
    const docRef = collection(db, "names");
    const res = await getDocs(query(docRef));
    set((state: any) => ({
        ...state,
        names: res.docs.map((n) => {
            return {    
                ...n.data(),
                id: n.id
            }
        })
    }));
  },
  deleteName: async (id: string) => {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "names", id);
    await deleteDoc(docRef);
    get().getNames();
  }
}));