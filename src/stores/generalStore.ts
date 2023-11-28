import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, or, orderBy, query, updateDoc, where } from 'firebase/firestore';
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
  patients: [],
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
    const res = await addDoc(docRef, {
      ...val,
      "closed": false
    });
    set((state: any) => ({
        ...state,
        appLoading: false
    }));
    get().getEvents();
  },
  updateEvent: async (eventId: string, val: {desiredAttendance: number, isBehavioral: boolean, date: Date, closed: boolean}) => {
    get().setLoading(true);
    const db = getFirestore(firebaseApp);
    const docEventRef = collection(db, `events`);
    const resEvent = await doc(docEventRef, eventId);
    await updateDoc(resEvent, val);
    get().setLoading(false);
    await get().getEvents();
  },

  updatePatient: async (eventId: string, patientID: string, eventType: string, payload: any) => {
    get().setLoading(true);
    const db = getFirestore(firebaseApp);
    const docRef = collection(db, `${eventType}/${eventId}/patients`);
    const refPatient = await doc(docRef, patientID);
    await updateDoc(refPatient, payload);
    await get().getPatientsByEventId(eventId);
  },

  deletePatient: async (eventId: string, patientID: string, eventType: string) => {
    get().setLoading(true);
    const db = getFirestore(firebaseApp);
    const docRef = collection(db, `${eventType}/${eventId}/patients`);
    const refPatient = await doc(docRef, patientID);
    await deleteDoc(refPatient);
    await get().getPatientsByEventId(eventId);
  },

  addPatientToEvent: async (val: any, eventId: string, isBehavioral: boolean = false) => {
    set((state: any) => ({
      ...state,
      appLoading: true
    }));
    const db = getFirestore(firebaseApp);
    const docRef = collection(db, `${isBehavioral ? 'behavioral' : 'clinic'}/${eventId}/patients`);
    const res = await addDoc(docRef, val);
    if (res.id) {
      await get().calcEventPatient(isBehavioral ? 'behavioral' : 'clinic', eventId);
      get().sendToasts([{
        severity: 'success',
        summary: 'Spot reserved! Thank you',
      }]);
    }
    set((state: any) => ({
      ...state,
      appLoading: false
    }));
    get().getEvents();
    return res;
  },
  calcEventPatient: async (type: string, eventId: string) => {
    const db = getFirestore(firebaseApp);
    console.log(type, eventId);
    console.log(`${type}/${eventId}/patients`);
    const docRef = collection(db, `${type}/${eventId}/patients`);
    const res = await getDocs(query(docRef));
    console.log(res);
    const docEventRef = collection(db, `events`);
    const resEvent = await doc(docEventRef, eventId);
    const resEventData = await getDoc(resEvent);
    console.log(resEvent);
    updateDoc(resEvent, {
      'totalPatient': res.size,
      'closed': resEventData?.data()?.desiredAttendance < res.size
    });
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
                date: new Date(n.data().date.seconds * 1000),
                id: n.id
            }
        })
    }));
  },
  deleteEvent: async (id: string) => {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "events", id);
    const docRefFolder = doc(db, "clinic", id);
    const docRefFolder2 = doc(db, "behavioral", id);
    await deleteDoc(docRef);
    await deleteDoc(docRefFolder);
    await deleteDoc(docRefFolder2);
    get().getEvents();
  },
  getOpenEvents: async () => {
    const db = getFirestore(firebaseApp);
    const docRef = collection(db, "events");
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 5);
    const res = await getDocs(query(docRef,
       where("closed", "==", false), 
       where("date", ">", currentDate),
       where("isBehavioral", "==", false)
    ));
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
  getOpenEventsBehavioval: async () => {
    const db = getFirestore(firebaseApp);
    const docRef = collection(db, "events");
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    const res = await getDocs(query(docRef, 
      where("closed", "==", false), 
      where("date", ">", currentDate),
      where("isBehavioral", "==", true)
    ));
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
  },
  /// PATIENTS
  getPatientsByEventId: async (eventId: string, type: string) => {
    get().setLoading(true);
    const db = getFirestore(firebaseApp);
    const docRef = collection(db, `${type}/${eventId}/patients`);
    const res = await getDocs(query(docRef, orderBy('firstName', 'asc'), orderBy('lastName', 'asc')));
    set((state: any) => ({
      ...state,
      patients: res.docs.map((n) => {
          return {
              ...n.data(),
              id: n.id
          }
      })
    }));
    get().setLoading(false);
  }
}));