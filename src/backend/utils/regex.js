export default function isValidString(input) {
    const regex = /^[A-Za-z\s]+$/;
    
    if (regex.test(input)) {
        return input.trim(); // Retourne le mot proprement (sans espaces inutiles)
    } else {
        return "Erreur : caractères invalides détectés !";
    }
}