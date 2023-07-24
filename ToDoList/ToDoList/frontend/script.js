const listaDeTarefa = document.getElementById("lista-de-tarefas");
const addTaskBtn = document.getElementById("botao-add-tarefa");
const input_description = document.getElementById("description");
const input_hora = document.getElementById("hora");
const input_data = document.getElementById("data");

async function fetchTasks() {
  const response = await fetch("http://localhost:2727/lists");
  const tasks = await response.json();
  return tasks;
}

function renderTasks(tasks) {
  listaDeTarefa.innerHTML = "";

  tasks.forEach((task) => {
    const row = document.createElement("tr");

    // Create a cell for description
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = task.description;
    row.appendChild(descriptionCell);

    // Create a cell for date
    const dateCell = document.createElement("td");
    dateCell.textContent = task.date;
    row.appendChild(dateCell);

    // Create a cell for hours
    const hoursCell = document.createElement("td");
    hoursCell.textContent = task.hours;
    row.appendChild(hoursCell);

    // Create a cell for delete button
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add("btn", "btn-outline-dark", "btn-sm"); // Adicione a classe "btn btn-secondary"
    deleteButton.addEventListener("click", async () => {
      await deleteTask(task._id); // Use a propriedade correta para o ID da tarefa
      init(); // Após a exclusão, renderize novamente as tarefas
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    // Append the completed row to the table
    listaDeTarefa.appendChild(row);
  });
}

async function deleteTask(taskId) {
  try {
    const response = await fetch(`http://localhost:2727/lists/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir a tarefa");
    }

    const deletedTask = await response.json();
    return deletedTask;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Função para formatar a data no formato dd/mm/aaaa
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Função para adicionar uma tarefa com a data formatada corretamente
async function addTask(description, date, hours) {
  // Convertendo a data para o formato correto antes de enviar
  const formattedDate = formatDate(new Date(date));

  var raw = JSON.stringify({
    description: description,
    date: formattedDate,
    hours: hours,
  });

  const response = await fetch("http://localhost:2727/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
  });

  const newTask = await response.json();
  return newTask;
}

addTaskBtn.addEventListener("click", async () => {
  const description = input_description.value.trim();
  const data = input_data.value.trim();
  const hora = input_hora.value.trim();
  if (description) {
    const newTask = await addTask(description, data, hora);
    //renderTasks([newTask]);
    init();
    input_description.value = "";
  }
});

// Configuração inicial quando a página carrega
async function init() {
  try {
    const tasks = await fetchTasks();
    renderTasks(tasks);
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
}

init();
