const lista_tarefas = document.getElementById("lista-de-tarefas");
const botao_add_tarefas = document.getElementById("botao-add-tarefa");
const input_descricao = document.getElementById("descricao");
const input_hora = document.getElementById("hora");
const input_data = document.getElementById("data");

async function fetchTarefas() {
  const response = await fetch("http://localhost:2727/lists");
  const tarefas = await response.json();
  return tarefas;
}

function renderizarTarefas(tarefas) {
  lista_tarefas.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const row = document.createElement("tr");

    const campoDescricao = document.createElement("td");
    campoDescricao.textContent = tarefa.descricao;
    row.appendChild(campoDescricao);

    const campoData = document.createElement("td");
    campoData.textContent = tarefa.data;
    row.appendChild(campoData);

    const campoHora = document.createElement("td");
    campoHora.textContent = tarefa.hora;
    row.appendChild(campoHora);

    const deleteCelula = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.classList.add("btn", "btn-outline-secondary", "btn-sm");
    deleteButton.addEventListener("click", async () => {
      await deleteTarefa(tarefa._id);
      init();
    });
    deleteCelula.appendChild(deleteButton);
    row.appendChild(deleteCelula);

    lista_tarefas.appendChild(row);
  });
}

async function deleteTarefa(tarefaId) {
  try {
    const response = await fetch(`http://localhost:2727/lists/${tarefaId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir a tarefa");
    }

    const tarefaDeletada = await response.json();
    return tarefaDeletada;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function formatacaoDaData(data) {
  const day = data.getDate().toString().padStart(2, "0");
  const month = (data.getMonth() + 1).toString().padStart(2, "0");
  const year = data.getFullYear();
  return `${day}/${month}/${year}`;
}

async function addtarefa(descricao, data, hora) {
  const dataFormatada = formatacaoDaData(new Date(data));

  let raw = JSON.stringify({
    descricao: descricao,
    data: dataFormatada,
    hora: hora,
  });

  const response = await fetch("http://localhost:2727/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
  });

  const novaTarefa = await response.json();
  return novaTarefa;
}

botao_add_tarefas.addEventListener("click", async () => {
  const descricao = input_descricao.value.trim();
  const data = input_data.value.trim();
  const hora = input_hora.value.trim();
  if (descricao) {
    const novaTarefa = await addtarefa(descricao, data, hora);
    //renderizarTarefas([novaTarefa]);
    init();
    input_descricao.value = "";
  }
});

async function init() {
  try {
    const tarefas = await fetchTarefas();
    renderizarTarefas(tarefas);
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
}

init();
