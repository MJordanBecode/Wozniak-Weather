// Importation de Chart.js en tant que module
import Chart from 'chart.js/auto';


export default async function displayGraphic(){

    // Données pour le graphique
const data = {
    labels: ["Janvier", "Février", "Mars", "Avril", "Mai"],
    datasets: [
        {
            label: "Acquisitions",
            data: [10, 20, 15, 25, 30],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
        },
    ],
};

// Configuration du graphique
const config = {
    type: "bar",
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Acquisitions Mensuelles",
            },
        },
    },
};

// Création du graphique (correction ici)
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, config);
});
}
