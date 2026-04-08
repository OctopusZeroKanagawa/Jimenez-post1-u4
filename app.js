let tarjetas = [];
let idContador = 1;
const generarId = () => idContador++;
const leerCampo = (selector) => {
  const campo = document.querySelector(selector);
  const valor = campo.value.trim();
  campo.value = "";
  return valor;
};
const galeria = document.querySelector("#galeria");

function crearElementoTarjeta({ id, titulo, descripcion, categoria }) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta", `categoria-${categoria}`);
  tarjeta.dataset.id = id;
  tarjeta.innerHTML = `
<span class="badge">${categoria}</span>
<h3>${titulo}</h3>
<p>${descripcion}</p>
<button class="btn-eliminar" data-id="${id}">Eliminar</button>
`;
  return tarjeta;
}

function agregarTarjeta() {
  const titulo = leerCampo("#input-titulo");
  const descripcion = leerCampo("#input-descripcion");
  const categoria = document.querySelector("#select-categoria").value;
  if (!titulo || !descripcion) {
    alert("El título y la descripción son obligatorios.");
    return;
  }
  const nuevaTarjeta = { id: generarId(), titulo, descripcion, categoria };
  tarjetas.push(nuevaTarjeta);
  const elemento = crearElementoTarjeta(nuevaTarjeta);
  galeria.appendChild(elemento);
}
document
  .querySelector("#btn-agregar")
  .addEventListener("click", agregarTarjeta);

galeria.addEventListener("click", (e) => {
  if (!e.target.matches(".btn-eliminar")) return;
  const idEliminar = Number(e.target.dataset.id);
  tarjetas = tarjetas.filter((t) => t.id !== idEliminar);
  const elementoTarjeta = galeria.querySelector(`[data-id="${idEliminar}"]`);
  if (elementoTarjeta) elementoTarjeta.remove();
});

const btnsFiltro = document.querySelectorAll(".btn-filtro");
btnsFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {
    btnsFiltro.forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");
    const categoriaFiltro = btn.dataset.categoria;
    const todasLasTarjetas = galeria.querySelectorAll(".tarjeta");
    todasLasTarjetas.forEach((tarjeta) => {
      if (categoriaFiltro === "todas") {
        tarjeta.classList.remove("oculta");
      } else {
        const coincide = tarjeta.classList.contains(
          `categoria-${categoriaFiltro}`
        );
        tarjeta.classList.toggle("oculta", !coincide);
      }
    });
  });
});
