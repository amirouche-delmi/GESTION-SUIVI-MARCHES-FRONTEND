import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,
      withCredentials: true,
      data: {
        email,
        password
      },
    })
    .then((res) => {
      if (res.data.errors) {
        console.log(res.data.errors);
        emailError.innerHTML = res.data.errors.email;
        passwordError.innerHTML = res.data.errors.password;
        if(res.data.errors.compteValide !== "") {
          toast.error(
            "Votre compte n'est encore validé veuillez attendre la validation pour pouvoir se connecter !",
            {
              duration: 6000,
              position: "bottom-right"
            }
          );
        }
      } else {
        toast.loading('Chargement en cours...');
        window.location = "/";
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <form action="" onSubmit={handleLogin} className="signin-signup-form">
        <h2>Se connecter</h2>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          required
        />
        <div className="email error"></div>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Mot de passe"
          required
        />
        <div className="password error"></div>
        <br />
        <input type="submit" className="submit-button" value="Se connecter" />
      </form>
    </>
  );
};

export default SignInForm;