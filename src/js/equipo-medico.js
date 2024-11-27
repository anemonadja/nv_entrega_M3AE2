import {listadoServicios} from './datos-servicios';

const titlePage = 'Equipo Medico';
console.log(`Cargando ${titlePage}`);

const doctores = [
  {
    nombre: 'Dr. Juan Pérez.',
    especialidad: 'Médico general',
    experiencia: 5,
    disponibilidad: 'Disponible',
    imagen: 'images/equipomedico.jpg',
    horario: ['09:00', '08:00']
  },
  {
    nombre: 'Dr. Juan Andres',
    especialidad: 'Médico general',
    experiencia: 5,
    disponibilidad: 'Disponible',
    imagen: 'images/equipomedico.jpg',
    horario: ['09:00', '08:00']
  },
  {
    nombre: 'Dr. Juan Adams',
    especialidad: 'Médico general',
    experiencia: 5,
    disponibilidad: 'Disponible',
    imagen: 'images/equipomedico.jpg',
    horario: ['09:00', '08:00']
  },
  {
    nombre: 'Dr. Pedro Pe',
    especialidad: 'Médico general',
    experiencia: 5,
    disponibilidad: 'Disponible',
    imagen: 'images/equipomedico.jpg',
    horario: ['09:00', '08:00']
  },
];

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

  output = output + `
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

listadoDoctores.innerHTML = output;