import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore';
import { ToastMessage } from 'primereact/toast'
import { create } from 'zustand'
import { firebaseApp } from '../library/common';
import { UserCredential } from 'firebase/auth';

export const generalStore = create((set, get: any) => ({
  toasts: null,
  appLoading: false,
  names: [],
  user: {
    accessToken: localStorage.getItem('accessToken'),
    uid: localStorage.getItem('uid'),
    email: localStorage.getItem('email')
  },
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
  },
  setUsers: async (res: UserCredential) => {
    localStorage.setItem('accessToken', await res.user.getIdToken());
    localStorage.setItem('email', res?.user?.email || "");
    localStorage.setItem('uid', res?.user?.uid);
  },
  isLoggedIn: () => {
    if (localStorage.getItem('accessToken')) {
      return true;
    } else {
      return false;
    }
  },
  logout: () => {
    localStorage.clear();
  }
}));