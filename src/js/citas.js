import { Pila } from './pila';
import { Cola } from './cola';

function obtenerFechaHoraActual() {
  const ahora = new Date();
  const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  
  return new Intl.DateTimeFormat('es-ES', opciones).format(ahora);
}

function renderizarPacientes(pacientes) {
  let salida = '';

  for (const paciente of pacientes) {
    salida += `
    <div class="card" style="width: 18rem;" data-bs-theme="dark">
      <div class="card-body">
        <h5 class="card-title">${paciente.nombre}</h5>
        <p class="card-text">${paciente.fechaHora}</p>
      </div>
    </div>
    `;
  }

  return salida;
}

const titlePage = 'Citas de pacientes';
console.log(`Cargando ${titlePage}`);

const tabla = document.querySelector('#listado-citas tbody');

console.log(tabla);

const pila = new Pila();

console.log('agregando datos a la pila');

pila.push({
  rut: '1231321-1',
  nombre: 'juan perez',
  fecha: '27-11-2024',
  hora: '09:00'
});

pila.push({
  rut: '222222-2',
  nombre: 'juan andres',
  fecha: '28-11-2024',
  hora: '10:00'
});

console.log('renderizar datos de la pila');

let contenido = '';

let contador = 1;

while (pila.length() > 0) {
  const paciente = pila.pop();

  contenido = contenido + `
    <tr>
      <td>${contador}</td>
      <td>${paciente.rut}</td>
      <td>${paciente.nombre}</td>
      <td>${paciente.fecha}</td>
      <td>${paciente.hora}</td>
    </tr>
  `;

  contador++;
}

tabla.innerHTML = contenido;

const botonAgendar = document.getElementById('agendar');

const cola = new Cola();

botonAgendar.addEventListener('click', () => {
  const nombre = document.getElementById('nombre');

  if (nombre.value.length === 0) {
    alert('Nombre no válido');
    return;
  }

  const dato = {
    nombre: nombre.value,
    fechaHora: obtenerFechaHoraActual(),
  };

  cola.enqueue(dato);

  const contenido = renderizarPacientes(cola.queue);
  document.getElementById('pacientes-por-atender').innerHTML = contenido;
  nombre.value = '';
});

const botonAtender = document.getElementById('atender');

botonAtender.addEventListener('click', () => {
  if (cola.isEmpty()) {
    alert('No hay mas pacientes');
    return;
  }

  cola.dequeue();

  const contenido = renderizarPacientes(cola.queue);
  document.getElementById('pacientes-por-atender').innerHTML = contenido;
});