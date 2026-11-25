import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAG4H07lGzT1IYF2NFI7z811r70KRi3Gts',
  authDomain: 'vehiculos-taller-7384a.firebaseapp.com',
  projectId: 'vehiculos-taller-7384a',
  storageBucket: 'vehiculos-taller-7384a.firebasestorage.app',
  messagingSenderId: '984363962',
  appId: '1:984363962:web:328580d3e2f8a011e32383',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)