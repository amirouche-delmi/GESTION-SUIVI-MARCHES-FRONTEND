import React, { useState } from 'react'
import SingUpForm from './SignUpForm'
import SingInForm from './SignInForm'

const Log = () => {
  const [signInModal, setSignInModal] = useState(true)
  const [signUpModal, setSignUpModal] = useState(false)

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false)
      setSignUpModal(true)
    } else if (e.target.id === "login") {
      setSignInModal(true)
      setSignUpModal(false)
    }
  }

  return (
    <div className='connection-form'>
      <div className="form-container">
        <ul>
          <li onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>Se connecter</li>
          <li onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null}>S'inscrire</li>
        </ul>
        {signInModal && <SingInForm />}
        {signUpModal && <SingUpForm />}
      </div>
    </div>
  )
}

export default Log