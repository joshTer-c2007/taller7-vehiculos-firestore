import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Query,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAG4H07lGzT1IYF2NFI7z811r70KRi3Gts',
  authDomain: 'vehiculos-taller-7384a.firebaseapp.com',
  projectId: 'vehiculos-taller-7384a',
  storageBucket: 'vehiculos-taller-7384a.firebasestorage.app',
  messagingSenderId: '984363962',
  appId: '1:984363962:web:328580d3e2f8a011e32383',
}

interface Vehiculo {
  marca: string
  modelo: string
  precio: number
  stock: number
  anio: number
  tipo: 'Sedan' | 'SUV' | 'Pickup' | 'Hatchback'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const vehiculosRef = collection(db, 'vehiculos')

async function ejecutarConsultas() {
  const consultas: { nombre: string; q: Query }[] = [
    {
      nombre: '1. SUV con precio mayor a 30000 ordenados por precio ascendente',
      q: query(
        vehiculosRef,
        where('tipo', '==', 'SUV'),
        where('precio', '>', 30000),
        orderBy('precio', 'asc')
      ),
    },
    {
      nombre: '2. Sedan con stock mayor a 0 ordenados por anio descendente',
      q: query(
        vehiculosRef,
        where('tipo', '==', 'Sedan'),
        where('stock', '>', 0),
        orderBy('anio', 'desc')
      ),
    },
    {
      nombre: '3. Precio entre 20000 y 40000 con stock > 0 ordenados por precio ASC',
      q: query(
        vehiculosRef,
        where('precio', '>=', 20000),
        where('precio', '<=', 40000),
        where('stock', '>', 0),
        orderBy('precio', 'asc')
      ),
    },
    {
      nombre: '4. Reto: Sedan con anio >= 2023 y stock > 0 ordenados por anio DESC',
      q: query(
        vehiculosRef,
        where('tipo', '==', 'Sedan'),
        where('anio', '>=', 2023),
        where('stock', '>', 0),
        orderBy('anio', 'desc')
      ),
    },
  ]

  for (const item of consultas) {
    console.log(`\n--- ${item.nombre} ---`)
    try {
      const snap = await getDocs(item.q)
      if (snap.empty) {
        console.log('Sin resultados.')
        continue
      }
      snap.forEach((doc) => {
        const d = doc.data() as Vehiculo
        console.log(
          `${d.marca} ${d.modelo} | Tipo: ${d.tipo} | Anio: ${d.anio} | Precio: $${d.precio} | Stock: ${d.stock}`
        )
      })
    } catch (error: unknown) {
      const err = error as { message?: string }
      console.error('Error / Indice requerido:', err.message ?? error)
    }
  }
}

ejecutarConsultas()
