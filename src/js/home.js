const titlePage = 'Home';
console.log(`Cargando ${titlePage}`);

const listadoServicios = [
  {
    imagen: 'images/consultas.jpg',
    titulo: 'Consulta',
    descripcion: 'Amplia variedad de profesionales y alta disponibilidad de bloques horarios.',
  },
  {
    imagen: 'images/urgencias.jpg',
    titulo: 'Urgencias',
    descripcion: 'Rápida atención en nuestra división de urgencias. <em>Estamos preparados para atenderte en máximo 1 hora desde tu llegada.</em>',
  },
  {
    imagen: 'images/especialidades.jpg',
    titulo: 'Especialidades',
    descripcion: 'Revisa nuestra oferta de especialidades y variedad de Exámenes de Laboratorio.',
  }
];

console.log(listadoServicios);

let contenidoServicios = '';

for (let servicio of listadoServicios) {
  contenidoServicios = contenidoServicios + `
    <div class="col-md-4">
      <div class="card">
        <img src="${servicio.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${servicio.titulo}</h5>
          <p class="card-text">${servicio.descripcion}</p>
        </div>
      </div>
    </div>
  `;
}
console.log(contenidoServicios);

const elemListadoServicios = document.getElementById('listado-servicios');

elemListadoServicios.innerHTML = contenidoServicios;

const buscarServicios = document.getElementById('buscar-servicios');

buscarServicios.addEventListener('click', function(event) {
  const busqueda = prompt('Ingrese el servicio a buscar');

  console.log('busqueda', busqueda)
  
  try {
    if (busqueda === null || busqueda.length === 0) {
      alert('Error: debe ingresar una palabra para buscar');
    } else {
      const listadosFiltrados = listadoServicios.filter((servicio) => {
        return servicio.titulo.toLowerCase().includes(busqueda.toLowerCase())
      });

      let contenidoServicios = '';

      for (let servicio of listadosFiltrados) {
        contenidoServicios = contenidoServicios + `
          <div class="col-md-4">
            <div class="card">
              <img src="${servicio.imagen}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${servicio.titulo}</h5>
                <p class="card-text">${servicio.descripcion}</p>
              </div>
            </div>
          </div>
        `;
      }

      elemListadoServicios.innerHTML = contenidoServicios;
    }
  } catch (error) {
    alert('se ha producido un error al filtrar los servicios');
  }
  
});