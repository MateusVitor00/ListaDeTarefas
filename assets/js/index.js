const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

function createLi() {
  const li = document.createElement("li");
  return li;
}

inputTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    createTarefa(inputTarefa.value);
  }
});

function clearInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

function creteBottomDelete(li) {
  li.innerHTML += " ";
  const bottonDelete = document.createElement("button");
  bottonDelete.innerHTML = "Apagar ";
  //bottonDelete.classList('apagar');
  bottonDelete.setAttribute('class', 'Apagar');
  bottonDelete.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(bottonDelete);
  
}

btnTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return;
  createTarefa(inputTarefa.value);
});


function createTarefa(textoInput) {
  const li = createLi();
  li.innerHTML = textoInput;
  tarefas.appendChild(li);
  clearInput();
  creteBottomDelete(li);
  saveTasks();
}

document.addEventListener('click', function(e) {
  const el = e.target;


  if(el.classList.contains('Apagar')){
    el.parentElement.remove();
    saveTasks();
  }
});

function saveTasks(){
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas){
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function addTaskSave(){
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);
  
  for(let tarefa of listaDeTarefas){
    createTarefa(tarefa);
  }
}
addTaskSave()