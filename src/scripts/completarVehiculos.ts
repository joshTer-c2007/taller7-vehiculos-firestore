import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAG4H07lGzT1IYF2NFI7z811r70KRi3Gts',
  authDomain: 'vehiculos-taller-7384a.firebaseapp.com',
  projectId: 'vehiculos-taller-7384a',
  storageBucket: 'vehiculos-taller-7384a.firebasestorage.app',
  messagingSenderId: '984363962',
  appId: '1:984363962:web:328580d3e2f8a011e32383',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const vehiculosRef = collection(db, 'vehiculos')

const vehiculosExtra = [
  { marca: 'Kia', modelo: 'Seltos', tipo: 'SUV', anio: 2025, precio: 28900, stock: 7 },
  { marca: 'Mazda', modelo: 'CX-30', tipo: 'SUV', anio: 2025, precio: 31500, stock: 5 },
  { marca: 'Chevrolet', modelo: 'Tracker', tipo: 'SUV', anio: 2024, precio: 24800, stock: 9 },
  { marca: 'Nissan', modelo: 'Kicks', tipo: 'SUV', anio: 2025, precio: 26400, stock: 6 },
  { marca: 'Volkswagen', modelo: 'T-Cross', tipo: 'SUV', anio: 2024, precio: 27900, stock: 4 },
  { marca: 'Hyundai', modelo: 'Accent', tipo: 'Sedan', anio: 2024, precio: 20400, stock: 8 },
  { marca: 'Chevrolet', modelo: 'Onix Sedan', tipo: 'Sedan', anio: 2025, precio: 19200, stock: 11 },
  { marca: 'Volkswagen', modelo: 'Jetta', tipo: 'Sedan', anio: 2025, precio: 32400, stock: 3 },
  { marca: 'Mazda', modelo: '3 Sedan', tipo: 'Sedan', anio: 2024, precio: 26900, stock: 5 },
  { marca: 'Nissan', modelo: 'Versa', tipo: 'Sedan', anio: 2023, precio: 18700, stock: 6 },
  { marca: 'Toyota', modelo: 'Tacoma', tipo: 'Pickup', anio: 2025, precio: 48900, stock: 4 },
  { marca: 'Chevrolet', modelo: 'Colorado', tipo: 'Pickup', anio: 2024, precio: 41200, stock: 5 },
  { marca: 'Nissan', modelo: 'Frontier', tipo: 'Pickup', anio: 2025, precio: 36800, stock: 8 },
  { marca: 'Volkswagen', modelo: 'Amarok', tipo: 'Pickup', anio: 2024, precio: 43500, stock: 3 },
  { marca: 'Great Wall', modelo: 'Poer', tipo: 'Pickup', anio: 2025, precio: 31900, stock: 7 },
  { marca: 'Hyundai', modelo: 'i20', tipo: 'Hatchback', anio: 2024, precio: 20100, stock: 6 },
  { marca: 'Toyota', modelo: 'Yaris Hatchback', tipo: 'Hatchback', anio: 2025, precio: 21800, stock: 9 },
  { marca: 'Chevrolet', modelo: 'Sail Hatchback', tipo: 'Hatchback', anio: 2023, precio: 16200, stock: 10 },
  { marca: 'Seat', modelo: 'Ibiza', tipo: 'Hatchback', anio: 2024, precio: 22600, stock: 4 },
  { marca: 'Renault', modelo: 'Sandero RS', tipo: 'Hatchback', anio: 2023, precio: 19800, stock: 5 },
]

async function completar() {
  for (const v of vehiculosExtra) {
    await addDoc(vehiculosRef, v)
  }
  console.log(`Se agregaron ${vehiculosExtra.length} vehiculos adicionales.`)
}

completar()