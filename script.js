document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("data-form");
    const exerciseInput = document.getElementById("exercise");
    const weightInput = document.getElementById("weight");
    const seriesInput = document.getElementById("series");
    const repsInput = document.getElementById("reps");
    const dataTable = document.getElementById("data-table");

    // Recupera os dados do Local Storage
    const getData = () => JSON.parse(localStorage.getItem("workouts")) || [];

    // Salva os dados no Local Storage
    const saveData = (data) => localStorage.setItem("workouts", JSON.stringify(data));

    // Atualiza a tabela com os dados armazenados
    const renderTable = () => {
        dataTable.innerHTML = "";
        const workouts = getData();
        workouts.forEach((workout, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td data-label="Exercício">${workout.exercise}</td>
                <td data-label="Carga (kg)">${workout.weight} kg</td>
                <td data-label="Séries">${workout.series}</td>
                <td data-label="Repetições">${workout.reps}</td>
                <td data-label="Ações"><button class="delete" data-index="${index}">Remover</button></td>
            `;
            dataTable.appendChild(row);
        });
    };

    // Adiciona novo treino
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const exercise = exerciseInput.value.trim();
        const weight = weightInput.value.trim();
        const series = seriesInput.value.trim();
        const reps = repsInput.value.trim();

        if (exercise && weight && series && reps) {
            const workouts = getData();
            workouts.push({ exercise, weight, series, reps });
            saveData(workouts);
            renderTable();
            form.reset();
        }
    });

    // Remove treino
    dataTable.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            const index = e.target.dataset.index;
            const workouts = getData();
            workouts.splice(index, 1);
            saveData(workouts);
            renderTable();
        }
    });

    // Renderiza a tabela ao carregar a página
    renderTable();
});