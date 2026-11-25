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

interface Vehiculo {
  marca: string
  modelo: string
  precio: number
  stock: number
  anio: number
  tipo: 'Sedan' | 'SUV' | 'Pickup' | 'Hatchback'
}

const vehiculosPrueba: Vehiculo[] = [
  { marca: 'Toyota', modelo: 'Corolla', precio: 24500, stock: 8, anio: 2025, tipo: 'Sedan' },
  { marca: 'Hyundai', modelo: 'Tucson', precio: 31000, stock: 5, anio: 2024, tipo: 'SUV' },
  { marca: 'Ford', modelo: 'Ranger', precio: 42000, stock: 6, anio: 2025, tipo: 'Pickup' },
  { marca: 'Mazda', modelo: '3 Hatchback', precio: 23000, stock: 4, anio: 2023, tipo: 'Hatchback' },
  { marca: 'Kia', modelo: 'Cerato', precio: 19500, stock: 10, anio: 2024, tipo: 'Sedan' },
  { marca: 'Chevrolet', modelo: 'Tracker', precio: 22800, stock: 0, anio: 2022, tipo: 'SUV' },
  { marca: 'Toyota', modelo: 'Hilux', precio: 46500, stock: 7, anio: 2026, tipo: 'Pickup' },
  { marca: 'Volkswagen', modelo: 'Golf', precio: 27500, stock: 3, anio: 2024, tipo: 'Hatchback' },
  { marca: 'Nissan', modelo: 'Sentra', precio: 25200, stock: 9, anio: 2025, tipo: 'Sedan' },
  { marca: 'Honda', modelo: 'CR-V', precio: 38900, stock: 4, anio: 2025, tipo: 'SUV' },
  { marca: 'Mitsubishi', modelo: 'L200', precio: 39500, stock: 2, anio: 2023, tipo: 'Pickup' },
  { marca: 'Suzuki', modelo: 'Swift', precio: 16800, stock: 14, anio: 2024, tipo: 'Hatchback' },
  { marca: 'Honda', modelo: 'Civic', precio: 29800, stock: 6, anio: 2026, tipo: 'Sedan' },
  { marca: 'Kia', modelo: 'Sportage', precio: 34200, stock: 11, anio: 2025, tipo: 'SUV' },
  { marca: 'Nissan', modelo: 'Frontier', precio: 36400, stock: 0, anio: 2021, tipo: 'Pickup' },
  { marca: 'Peugeot', modelo: '208', precio: 18900, stock: 5, anio: 2023, tipo: 'Hatchback' },
  { marca: 'Toyota', modelo: 'Camry', precio: 37500, stock: 3, anio: 2024, tipo: 'Sedan' },
  { marca: 'Hyundai', modelo: 'Santa Fe', precio: 48000, stock: 2, anio: 2026, tipo: 'SUV' },
  { marca: 'Chevrolet', modelo: 'D-Max', precio: 33500, stock: 12, anio: 2022, tipo: 'Pickup' },
  { marca: 'Kia', modelo: 'Picanto', precio: 15400, stock: 18, anio: 2025, tipo: 'Hatchback' },
  { marca: 'Hyundai', modelo: 'Elantra', precio: 22900, stock: 7, anio: 2022, tipo: 'Sedan' },
  { marca: 'Toyota', modelo: 'RAV4', precio: 35800, stock: 9, anio: 2025, tipo: 'SUV' },
]

async function poblarVehiculos() {
  const colRef = collection(db, 'vehiculos')
  for (const vehiculo of vehiculosPrueba) {
    const docRef = await addDoc(colRef, vehiculo)
    console.log(`Creado: ${vehiculo.marca} ${vehiculo.modelo} (ID: ${docRef.id})`)
  }
  console.log(`Listo: se insertaron ${vehiculosPrueba.length} vehiculos.`)
}

poblarVehiculos().catch((error) => {
  console.error('Error al poblar vehiculos:', error)
})