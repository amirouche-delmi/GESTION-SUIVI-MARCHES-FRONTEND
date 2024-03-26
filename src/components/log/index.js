import React, { useState } from 'react'
import SingUpForm from './SignUpForm'
import SingInForm from './SignInForm'

const Log = () => {
  const [signInModal, setSignInModal] = useState(true)
  const [signUpModal, setSignUpModal] = useState(false)

  const handleModals = (e) => {
    console.log(e.target.id);
    if (e.target.id === "register") {
      setSignInModal(false)
      setSignUpModal(true)
    } else if (e.target.id === "login") {
      setSignInModal(true)
      setSignUpModal(false)
    }
  }

  return (
      <div className="log-container">
        <div className='log-content'>
          {signInModal && <SingInForm />}
          {signUpModal && <SingUpForm />}
        </div>
        <div className="log-footer">
          <div className={signInModal ? "active-div" : null}>J'ai pas de compte ? <span onClick={handleModals} id="register" className={signInModal ? "active-span" : null}>S'inscrire</span></div>
          <div className={signUpModal ? "active-div" : null}>J'ai déjà un compte ? <span onClick={handleModals} id="login" className={signUpModal ? "active-span" : null}>Se connecter</span></div>
        </div>
      </div>
  )
}

export default Log