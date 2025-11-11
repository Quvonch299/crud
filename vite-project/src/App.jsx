import React from 'react'
import CRUD from './components/CRUD'
import { Toaster } from 'react-hot-toast';
export default function App() {
  return (
    <div>
      <CRUD/>
  <Toaster
  position="top-right"
  reverseOrder={false}
/>
    </div>
  )
}
