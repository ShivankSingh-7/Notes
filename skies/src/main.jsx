import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createRoutesFromElements, Route } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import { Home, About, Hero } from './Components'
import { NoteProvider } from './Context/NoteContext'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Hero />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/about" element={<About />}/>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoteProvider >
      <RouterProvider router={router} />
    </NoteProvider>
  </StrictMode>,
)
