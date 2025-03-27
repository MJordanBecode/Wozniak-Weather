function isValidString(input) {
    // Vérifie que la chaîne contient uniquement des lettres et des espaces
    const regex = /^[A-Za-z ]+$/;
    return regex.test(input);
}