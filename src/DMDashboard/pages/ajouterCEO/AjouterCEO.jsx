import "./AjouterCEO.scss";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AjouterCEO() {

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [role, setRole] = useState("CEO");

  const handleRegister = async (e) => {
    e.preventDefault();
    const nomError = document.querySelector(".nom.error");
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
            email,
            password,
            role
          });  
          if (response.data.errors) {
            nomError.innerHTML = response.data.errors.nom;
            emailError.innerHTML = response.data.errors.email;
            roleError.innerHTML = response.data.errors.role;
          } else {
            toast.success(
              "Le compte de la nouvelle CEO a été créé avec succès.",
              {
                duration: 6000,
                position: "bottom-right"
              }
            );

            setNom("");
            setEmail("");
            setPassword("");
            setControlPassword("");
            nomError.innerHTML="";
            emailError.innerHTML="";
            passwordError.innerHTML = "";
            passwordConfirmError.innerHTML = "";
          }
        } catch (err) {
          console.log(err);
          toast.error(
            "Une erreur s'est produite lors de l'enregistrement !",
            {
              duration: 6000,
              position: "bottom-right"
            }
          );
        }
      }
    }
  };
  

  return (
    <div className="ajouter-ceo-container">
      <div className="log-container">
        <form onSubmit={handleRegister} className="signup-form">
          <h2>Nouvelle CEO</h2>
          <input
            type="text"
            name="nom"
            id="nom"
            required
            onChange={(e) => setNom(e.target.value)}
            value={nom}
            placeholder="Nom"
          />
          <div className="nom error"></div>
          <br />
          {/* ------------------------------------------------------------------------- */}
          <input
            type="text"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
          <div className="email error"></div>
          <br />
          {/* ------------------------------------------------------------------------- */}
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Mot de passe"
          />
          <div className="password error"></div>
          <br />
          {/* ------------------------------------------------------------------------- */}
          <input
            type="password"
            name="password"
            id="password-conf"
            required
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
            placeholder="Confirmer mot de passe"
          />
          <div className="password-confirm error"></div>
          <br />
          {/* ------------------------------------------------------------------------- */}
          <input type="submit" className="submit-button" value="Valider" />          
        </form>  
      </div>    
    </div>
  );
}
