// fonction permettant de convertir le timestamp en format de date permmettant son affichage pour les messages
export const dateParser = (num) => {
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };
  
    let timestamp = Date.parse(num);
  
    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
  
    return date.toString();
};

// check si les reducer sont vides ou non
export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};