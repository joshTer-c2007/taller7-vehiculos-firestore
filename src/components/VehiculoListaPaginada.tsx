import { useEffect, useState } from 'react'
import { initializeApp, getApps } from 'firebase/app'
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from 'firebase/firestore'
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAG4H07lGzT1IYF2NFI7z811r70KRi3Gts',
  authDomain: 'vehiculos-taller-7384a.firebaseapp.com',
  projectId: 'vehiculos-taller-7384a',
  storageBucket: 'vehiculos-taller-7384a.firebasestorage.app',
  messagingSenderId: '984363962',
  appId: '1:984363962:web:328580d3e2f8a011e32383',
}

interface VehiculoItem {
  id: string
  marca: string
  modelo: string
  tipo: string
  anio: number
  precio: number
  stock: number
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
const db = getFirestore(app)
const PAGE_SIZE = 10

export default function VehiculoListaPaginada() {
  const [vehiculos, setVehiculos] = useState<VehiculoItem[]>([])
  const [pagina, setPagina] = useState<number>(1)
  const [ultimoDoc, setUltimoDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [historialCursores, setHistorialCursores] = useState<(QueryDocumentSnapshot<DocumentData> | null)[]>([null])
  const [haySiguiente, setHaySiguiente] = useState<boolean>(false)
  const [cargando, setCargando] = useState<boolean>(false)

  async function cargarPagina(numeroPagina: number, cursorInicio: QueryDocumentSnapshot<DocumentData> | null) {
    setCargando(true)
    try {
      const vehiculosRef = collection(db, 'vehiculos')
      const consulta = cursorInicio
        ? query(vehiculosRef, orderBy('marca', 'asc'), startAfter(cursorInicio), limit(PAGE_SIZE))
        : query(vehiculosRef, orderBy('marca', 'asc'), limit(PAGE_SIZE))

      const snapshot = await getDocs(consulta)
      const items: VehiculoItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<VehiculoItem, 'id'>),
      }))

      const nuevoUltimo = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null
      setVehiculos(items)
      setUltimoDoc(nuevoUltimo)
      setPagina(numeroPagina)
      setHaySiguiente(snapshot.docs.length === PAGE_SIZE)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarPagina(1, null)
  }, [])

  function irSiguiente() {
    if (!ultimoDoc || !haySiguiente || cargando) return
    setHistorialCursores((prev) => [...prev, ultimoDoc])
    cargarPagina(pagina + 1, ultimoDoc)
  }

  function irAnterior() {
    if (pagina <= 1 || cargando) return
    const nuevoHistorial = historialCursores.slice(0, -1)
    const cursorAnterior = nuevoHistorial[nuevoHistorial.length - 1] ?? null
    setHistorialCursores(nuevoHistorial)
    cargarPagina(pagina - 1, cursorAnterior)
  }

  const inicioRango = vehiculos.length === 0 ? 0 : (pagina - 1) * PAGE_SIZE + 1
  const finRango = vehiculos.length === 0 ? 0 : inicioRango + vehiculos.length - 1

  return (
    <div style={{ maxWidth: 920, margin: '2rem auto', padding: '0 1rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Taller Práctico N° 8 — Paginación de Vehículos</h1>
      <p>
        Página <strong>{pagina}</strong> · Registros <strong>{inicioRango}–{finRango}</strong> (máximo {PAGE_SIZE} por consulta)
      </p>

      {cargando ? (
        <p>Cargando registros desde Firestore...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>#</th>
              <th style={{ padding: '0.5rem' }}>Marca</th>
              <th style={{ padding: '0.5rem' }}>Modelo</th>
              <th style={{ padding: '0.5rem' }}>Tipo</th>
              <th style={{ padding: '0.5rem' }}>Año</th>
              <th style={{ padding: '0.5rem' }}>Precio</th>
              <th style={{ padding: '0.5rem' }}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((v, idx) => (
              <tr key={v.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.5rem' }}>{inicioRango + idx}</td>
                <td style={{ padding: '0.5rem' }}>{v.marca}</td>
                <td style={{ padding: '0.5rem' }}>{v.modelo}</td>
                <td style={{ padding: '0.5rem' }}>{v.tipo}</td>
                <td style={{ padding: '0.5rem' }}>{v.anio}</td>
                <td style={{ padding: '0.5rem' }}>${v.precio}</td>
                <td style={{ padding: '0.5rem' }}>{v.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
        <button type="button" onClick={irAnterior} disabled={pagina === 1 || cargando}>
          Anterior
        </button>
        <span>Página {pagina}</span>
        <button type="button" onClick={irSiguiente} disabled={!haySiguiente || cargando}>
          Siguiente
        </button>
      </div>
    </div>
  )
}
