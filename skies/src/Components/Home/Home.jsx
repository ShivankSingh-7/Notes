import React from 'react'
import { useNote } from '../../Context/NoteContext'

function Home() {
  const {user} = useNote()
  return (
    <div>
      Welcome {user}
    </div>
  )
}

export default Home
