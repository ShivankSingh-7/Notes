import React, { useState } from 'react'
import { useNote } from '../../Context/NoteContext'


function SignUp() {
  const[fullName, setFullName] = useState()
  const[email, setEmail] = useState()
  const[password, setPassword] = useState()
  const [confPassword, setConfPassword] = useState()

  const {setIsLoggedIn, setUserName, setUser} = useNote()
  return (
    <div>
      SignUp
    </div>
  )
}

export default SignUp
