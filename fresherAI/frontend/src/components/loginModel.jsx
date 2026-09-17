import { signInWithPopup } from 'firebase/auth'
import React from 'react'



const handleGoogleAuth = async() =>{
  try{
    const result = await signInWithPopup(auth,provider)
    console
  }
}

const loginModel = (onClose) => {
  return (
    <div>loginModel</div>
  )
}

export default loginModel