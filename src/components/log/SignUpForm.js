import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const nomError = document.querySelector(".nom.error");
    const prenomError = document.querySelector(".prenom.error");
    const telephoneError = document.querySelector(".telephone.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(".password-confirm.error");
    const roleError = document.querySelector(".role.error");

    if (password.length < 6) {
      passwordError.innerHTML = "Le mot de passe doit faire 6 caractères minimum";
      passwordConfirmError.innerHTML = "";
    } else {
      if (password !== controlPassword) {
        passwordError.innerHTML = "";
        passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
      }
      else {
        passwordError.innerHTML = "";
        passwordConfirmError.innerHTML = "";
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/register`, {
            nom,
            prenom,
            telephone,
            email,
            password,
            role
          });  
          if (response.data.errors) {
            nomError.innerHTML = response.data.errors.nom;
            prenomError.innerHTML = response.data.errors.prenom ;
            telephoneError.innerHTML = response.data.errors.telephone;
            emailError.innerHTML = response.data.errors.email;
            roleError.innerHTML = response.data.errors.role;
          } else {
            setFormSubmit(true);
          }
        } catch (error) {
          console.error("Erreur lors de l'enregistrement : ", error);
        }
      }
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          {document.getElementById("login").classList.add("active-btn")}
          {document.getElementById("register").classList.remove("active-btn")}
          <span></span>
          <h4 className="success">
            Votre compte a été créé avec succès. Veuillez attendre la validation de l'administrateur pour pouvoir vous connecter.
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          {/* ------------------------------------------------------------------------- */}
          <label htmlFor="nom">Nom</label>
          <br />
          <input
            type="text"
            name="nom"
            id="nom"
            required
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
          <div className="nom error"></div>
          <br />
          {/* ------------------------------------------------------------------------- */}
          <label htmlFor="prenom">Prénom</label>
          <br />
          <input
            type="text"
            name="prenom"
            id="prenom"
            required
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />
          <div className="prenom error"></div>
          <br />
          {/* ------------------------------------------------------------------------- */}
          <label htmlFor="telephone">Téléphone</label>
          <br />
          <input
            type="text"
            name="telephone"
            id="telephone"
            required
            onChange={(e) => setTelephone(e.target.value)}
            value={telephone}
          />
          <div className="telephone error"></div>
          <br />
          {/* ------------------------------------------------------------------------- */}
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          {/* ------------------------------------------------------------------------- */}
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          {/* ------------------------------------------------------------------------- */}
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br/>
          <input
            type="password"
            name="password"
            id="password-conf"
            required
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          {/* ------------------------------------------------------------------------- */}
          <label>Rôle</label>
          <div className="role">
            <div className="margin-radio">
              <label htmlFor="gestionnaire" className="label-radio">Gestionnaire</label>
              <input
                type="radio"
                name="role"
                id="gestionnaire"
                required
                value="Gestionnaire"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
            </div>
            <div className="margin-radio">
              <label htmlFor="observateur" className="label-radio">Observateur</label>
              <input
                type="radio"
                name="role"
                id="observateur"
                required
                value="Observateur"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="role error"></div>
          {/* ------------------------------------------------------------------------- */}
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;