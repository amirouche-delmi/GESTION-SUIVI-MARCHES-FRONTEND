import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import "./profil.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../actions/userActions";
import { dateParser, formaterNumeroTelephone, isValidEmail } from "../../../utils/utils";
import { toast } from "react-hot-toast";

export default function Profil() {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch()

  const [nom, setNom] = useState(userData.nom);
  const [email, setEmail] = useState(userData.email);
  const [telephone, setTelephone] = useState(userData.telephone || "");
  const [adresse, setAdresse] = useState(userData.adresse);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if ((nom.length >= 3) && (isValidEmail(email)) && (telephone.length === 10 ) && (adresse !== "")) {
      dispatch(updateUser(userData._id, { nom, email, telephone, adresse }));

      toast.success("Mise à jour réussie !", {
        duration: 6000,
        position: "bottom-right",
      });
    }
    else {
      setNom(userData.nom)
      setEmail(userData.email)
      setTelephone(userData.telephone)
      setAdresse(userData.adresse)

      toast.error("Mise à jour échouée !", {
        duration: 6000,
        position: "bottom-right",
      });
    }
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Profil</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="./imgs/ceo.jpg"
              alt="profil"
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{userData.nom}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Details du compte</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.nom /*Direction des Ressources Humaines (DRH)*/}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{dateParser(userData.createdAt)}</span>
            </div>
            <span className="userShowTitle">détails de contact</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{formaterNumeroTelephone(userData.telephone)}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.adresse}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Éditer profil</span>
          <form className="userUpdateForm" onSubmit={handleUpdate}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nom </label>
                <input
                  type="text"
                  name="nom"
                  className="userUpdateInput"
                  onChange={(e) => setNom(e.target.value)}
                  value={nom}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="userUpdateInput"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="userUpdateItem">
                <label>Téléphone</label>
                <input
                  type="text"
                  name="telephone"
                  className="userUpdateInput"
                  onChange={(e) => setTelephone(e.target.value)}
                  value={telephone}
                />
              </div>
              <div className="userUpdateItem">
                <label>Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  className="userUpdateInput"
                  onChange={(e) => setAdresse(e.target.value)}
                  value={adresse || "Alger | Algérie"}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="./imgs/ceo.jpg"
                  alt="profil"
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Éditer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
