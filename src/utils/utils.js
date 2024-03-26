export const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  
export const timestampParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let date = new Date(num).toLocaleDateString("fr-FR", options);

  return date.toString();
}

export const dateParser = (num) => {
  let options = {
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const formatDate = (dateString) => {
  const dateObject = new Date(dateString);

  // Extraction des composants de la date
  const day = ('0' + dateObject.getDate()).slice(-2); // Jour (ajout de zéro pour le format)
  const month = ('0' + (dateObject.getMonth() + 1)).slice(-2); // Mois (ajout de zéro pour le format)
  const year = dateObject.getFullYear(); // Année

  const hours = ('0' + dateObject.getHours()).slice(-2); // Heures (ajout de zéro pour le format)
  const minutes = ('0' + dateObject.getMinutes()).slice(-2); // Minutes (ajout de zéro pour le format)
  const seconds = ('0' + dateObject.getSeconds()).slice(-2); // Secondes (ajout de zéro pour le format)

  // Formatage de la date
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

export const formaterNumeroTelephone = (numero) => {
  const numeroFormate = numero.replace(/.{2}/g, '$& ');
  return numeroFormate;
};

export const isValidEmail = (email) => {
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegExp.test(email);
}
