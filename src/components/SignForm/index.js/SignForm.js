import React from 'react'
import styles from './styles.module.css'



export default function SignForm() {
    
    const handleSignEmail=() => {
        console.log("email")
    }
    const handleSignFacebook=()=> {
        console.log("face")
    }
  return (
    <>
      <div>
        <SignEmail handleClick={handleSignEmail} />
      </div>
      <div>
        <SignFacebook handleClick={handleSignFacebook} />
      </div>
    </>
  )
}

function SignEmail({ handleClick }) {
  return (
    <div onClick={handleClick} className={styles.sign_button}>
      ingresa con tu Email
    </div>
  )
}
function SignFacebook({ handleClick }) {
  return (
    <div onClick={handleClick} className={styles.sign_button}>
      ingresa con Facebook
    </div>
  )
}
