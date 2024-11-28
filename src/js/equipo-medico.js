import {listadoServicios} from './datos-servicios';

function crearDoctor(nombre, experiencia, imagen, especialidad, disponibilidad) {
  return `
    <div class="col-md-3 mt-2">
      <div class="card">
        <img src="${imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">
            ${especialidad}<br>Experiencia: ${experiencia}
            <br>
            Disponibilidad: ${disponibilidad}
          </p>
        </div>
      </div>
    </div>
  `;
}

function ordernar(doctores) {
  for (let i = 0; i < doctores.length; i++) {
    for (let j = i; j < doctores.length; j++) {
      if (doctores[i].experiencia < doctores[j].experiencia) {
        [doctores[i], doctores[j]] = [doctores[j], doctores[i]];
      }
    }
  }
}

const titlePage = 'Equipo Medico';
console.log(`Cargando ${titlePage}`);

const doctores = [
  {
    nombre: 'Dr. Juan Pérez.',
    especialidad: 'Médico general',
    experiencia: 1,
    disponibilidad: 'Disponible',
    imagen: 'images/equipomedico.jpg',
    horario: ['09:00', '08:00']
  },
  {
    nombre: 'Dr. Juan Andres',
    especialidad: 'Cirujano',
    experiencia: 3,
    disponibilidad: 'Disponible',
    imagen: 'images/equipomedico.jpg',
    horario: ['09:00', '08:00']
  },
  {
    nombre: 'Dr. Juan Adams',
    especialidad: 'Pediatra',
    experiencia: 2,
    disponibilidad: 'Disponible',
    imagen: 'images/equipomedico.jpg',
    horario: ['09:00', '08:00']
  },
  {
    nombre: 'Dr. Pedro Pe',
    especialidad: 'Ginecologo',
    experiencia: 7,
    disponibilidad: 'Disponible',
    imagen: 'images/equipomedico.jpg',
    horario: ['09:00', '08:00']
  },
];

ordernar(doctores);

const doctoresClonados = JSON.parse(JSON.stringify(doctores));

doctoresClonados[0].nombre = 'me cambiaron el nombre';

console.log('arreglo original', doctores);
console.log('arreglo clonado', doctoresClonados);

const listadoDoctores = document.getElementById('listado-doctores');
let output = '';

console.log('elemento de listado', listadoDoctores)

console.log('json stringify del arreglo clonado', JSON.stringify(doctoresClonados));

const datosMergeados = [...doctores, ...listadoServicios];

console.log('datos mergeados', datosMergeados);

for (const doctor of doctores) {
  const {nombre, especialidad, experiencia, disponibilidad, imagen} = doctor;

  output = output + crearDoctor(nombre, experiencia, imagen, especialidad, disponibilidad);
}

listadoDoctores.innerHTML = output;

const textoBuscar = document.getElementById('buscar-doctor');

textoBuscar.addEventListener('keyup', (event) => {
  const termino = event.target.value;

  const drFiltrados = doctores.filter(doctor => {
    const {nombre, especialidad} = doctor;

    return nombre.toLowerCase()
    .replace('á', 'a')
    .replace('é', 'e')
    .replace('í', 'i')
    .replace('ó', 'o')
    .replace('ú', 'u')
    .includes(termino.toLowerCase()) || 
      especialidad.toLowerCase()
      .replace('á', 'a')
      .replace('é', 'e')
      .replace('í', 'i')
      .replace('ó', 'o')
      .replace('ú', 'u').includes(termino.toLowerCase());
  });

  let output = '';

  for (const doctor of drFiltrados) {
    const {nombre, especialidad, experiencia, disponibilidad, imagen} = doctor;

    output += crearDoctor(nombre, experiencia, imagen, especialidad, disponibilidad);
  }

  listadoDoctores.innerHTML = output;
});