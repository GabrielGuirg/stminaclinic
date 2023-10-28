import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore';
import { ToastMessage } from 'primereact/toast'
import { create } from 'zustand'
import { firebaseApp } from '../library/common';
import { UserCredential } from 'firebase/auth';
import { ReactElement } from 'react';

export const generalStore = create((set, get: any) => ({
  toasts: null,
  appLoading: false,
  events: [],
  user: {
    accessToken: localStorage.getItem('accessToken'),
    uid: localStorage.getItem('uid'),
    email: localStorage.getItem('email')
  },
  sideBars: [],
  sideBarOpen: false,
  sideBarLength: 0,
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
  addEvent: async (val: {name: String, desiredAttendance: number, isBehavioral: boolean, date: Date}) => {
    set((state: any) => ({
        ...state,
        appLoading: true
    }));
    const db = getFirestore(firebaseApp);
    const docRef = collection(db, "events");
    const res = await addDoc(docRef, val);
    set((state: any) => ({
        ...state,
        appLoading: false
    }));
    get().getEvents();
  },
  getEvents: async () => {
    const db = getFirestore(firebaseApp);
    const docRef = collection(db, "events");
    const res = await getDocs(query(docRef));
    set((state: any) => ({
        ...state,
        events: res.docs.map((n) => {
            return {    
                ...n.data(),
                id: n.id
            }
        })
    }));
  },
  deleteEvent: async (id: string) => {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "events", id);
    await deleteDoc(docRef);
    get().getEvents();
  },
  getOpenEvents: async () => {
    const db = getFirestore(firebaseApp);
    const docRef = collection(db, "events");
    const res = await getDocs(query(docRef));
    set((state: any) => ({
        ...state,
        events: res.docs.map((n) => {
            return {    
                ...n.data(),
                date: new Date(n.data().date.seconds * 1000),
                id: n.id
            }
        })
    }));
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
  },
  checkSideBar: () => {
    if (get().sideBars.length > 0) {
      set((state: any) => ({
        ...state,
        sideBarOpen: true
      }));
    } else {
      set((state: any) => ({
        ...state,
        sideBarOpen: false
      }));
    }
  },
  addSideBar: (page: ReactElement) => {
    const tempSideBar = get().sideBars;
    tempSideBar.push(page);
    console.log(tempSideBar);
    set((state: any) => ({
      ...state,
      sideBars: tempSideBar,
      sideBarOpen: true,
      sideBarLength: tempSideBar.length
    }));
    get().checkSideBar();
    
  },
  popSideBar: () => {
    const tempSideBar = get().sideBars;
    tempSideBar.splice(tempSideBar.length - 1, 1);
    set((state: any) => ({
      ...state,
      sideBars: tempSideBar,
      sideBarLength: tempSideBar.length
    }));
    get().checkSideBar();
  },
  clearSideBar: () => {
    set((state: any) => (
      {
        ...state,
        sideBarOpen: [],
        sideBarLength: 0
      }
    ));
    get().checkSideBar()
  }
}));