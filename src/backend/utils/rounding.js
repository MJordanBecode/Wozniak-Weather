export default function customRound(num) {
    // Si la partie décimale est inférieure à 0.5, arrondir à l'entier le plus proche
    if (num % 1 < 0.5) {
        return Math.round(num);  // Arrondi à l'entier le plus proche
    } else {
        return Math.ceil(num);   // Arrondi à l'entier supérieur
    }
}