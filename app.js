console.log("Suscríbete al canal y dale me gusta 😍");

const $ = (element) => document.getElementById(element);

const formulario = $("formulario");
const listaTareas = $("lista-tareas");
const template = $("template").content;
const fragment = document.createDocumentFragment();
let tareas = {};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tareas")) {
    tareas = JSON.parse(localStorage.getItem("tareas"));
  }
  pintarTareas();
});

listaTareas.addEventListener("click", (e) => {
  btnAccion(e);
});

const setTarea = (e) => {
  const texto = e.target.querySelector("input").value;

  if (texto.trim() == "") {
    console.log("Esta vacio");
  }

  const tarea = {
    id: Date.now(),
    texto: texto,
    estado: false,
  };

  tareas[tarea.id] = tarea;
  pintarTareas();

  formulario.reset();

  e.target.querySelector("input").focus();
};

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  setTarea(e);
});

const pintarTareas = () => {
  localStorage.setItem("tareas", JSON.stringify(tareas));

  if (Object.values(tareas).length === 0) {
    listaTareas.innerHTML = `<div class="alert alert-dark text-center">
            Sin tareas pendientes
            </div>`;
    return;
  }

  listaTareas.innerHTML = " ";
  Object.values(tareas).forEach((tarea) => {
    const clone = template.cloneNode(true);
    clone.querySelector("p").textContent = tarea.texto;

    if (tarea.estado) {
      clone
        .querySelectorAll(".fas")[0]
        .classList.replace("fa-check-circle", "fa-undo-alt");
      clone
        .querySelector(".alert")
        .classList.replace("alert-warning", "alert-primary");
      clone.querySelector("p").style.textDecoration = "line-through";
    }

    clone.querySelectorAll(".fas")[0].dataset.id = tarea.id;
    clone.querySelectorAll(".fas")[1].dataset.id = tarea.id;
    fragment.appendChild(clone);
  });

  listaTareas.appendChild(fragment);
};

const btnAccion = (e) => {
  if (e.target.classList.contains("fa-check-circle")) {
    tareas[e.target.dataset.id].estado = true;
    pintarTareas();
  }

  if (e.target.classList.contains("fa-minus-circle")) {
    // console.log(e.target.dataset.id)
    delete tareas[e.target.dataset.id];
    pintarTareas();
  }

  if (e.target.classList.contains("fa-undo-alt")) {
    tareas[e.target.dataset.id].estado = false;
    pintarTareas();
  }
  e.stopPropagation();
};
