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

async function obtenerDoctores() {
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
  
    if (!respuesta.ok) {
      return [];
    }
  
    const json = respuesta.json();
  
    return json;
  } catch (error) {
    console.error(`Error al obtener los doctores: ${error.message}`);

    return [];
  }
}

function calcularHorasDoctor(horasDoctores, doctores) {
  if (doctores.length === 0) {
    return;
  }

  const doctor = doctores[0].doctor;
  const restoDoctores = doctores.slice(1);

  if (!(doctor in horasDoctores)) {
    horasDoctores[doctor] = 0;
  }

  horasDoctores[doctor] += 1;

  return calcularHorasDoctor(horasDoctores, restoDoctores);
}

function calcularDescuentos(precio, aplicarDescuento){
  return aplicarDescuento (precio)
}

function aplicarDescuento(porcentaje) {
  return function (precio) {
    return (1 - porcentaje / 100) * precio;
  }
}

const titlePage = 'Citas de pacientes';
console.log(`Cargando ${titlePage}`);
const calcularCosto = (price) => (qty) => price * qty;

obtenerDoctores().then((doctores) => {
  const tabla = document.querySelector('#listado-citas tbody');

  console.log(tabla);

  const pila = new Pila();

  console.log('agregando datos a la pila');
  const pacientesAtendidos = [
    {
      rut: '1231321-1',
      nombre: 'juan perez',
      fecha: '27-11-2024',
      hora: '09:00',
      doctor: doctores[0].name,
      precio: 11000,
      doctorId: doctores[0].id,
      espera: 15,
    },
    {
      rut: '222222-2',
      nombre: 'juan andres',
      fecha: '28-11-2024',
      hora: '10:00',
      doctor: doctores[1].name,
      precio: 10000,
      doctorId: doctores[1].id,
      espera: 30,
    },
    {
      rut: '333333-3',
      nombre: 'juanita urrutia',
      fecha: '28-11-2024',
      hora: '10:00',
      doctor: doctores[2].name,
      precio: 15000,
      doctorId: doctores[2].id,
      espera: 12,
    },
    {
      rut: '1231321-1',
      nombre: 'juan perez',
      fecha: '27-11-2024',
      hora: '09:00',
      doctor: doctores[0].name,
      precio: 11000,
      doctorId: doctores[0].id,
      espera: 25,
    },
    {
      rut: '222222-2',
      nombre: 'juan andres',
      fecha: '28-11-2024',
      hora: '10:00',
      doctor: doctores[1].name,
      precio: 10000,
      doctorId: doctores[1].id,
      espera: 45,
    },
  ];

  const btnDescuentos = document.getElementById("btn-descuentos");
  btnDescuentos.addEventListener ('click', function () {
    const mensaje = [];

    pacientesAtendidos.forEach(paciente => {
      mensaje.push(`${paciente.nombre}: ${calcularDescuentos(paciente.precio, aplicarDescuento(15))} (15% descuento)`);
    })

    alert(mensaje.reverse().join("\n"));
  });

  pacientesAtendidos.forEach(paciente => pila.push(paciente));

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
        <td>${paciente.doctor}</td>
        <td>${paciente.precio}</td>
        <td>${paciente.espera}</td>
      </tr>
    `;

    contador++;
  }

  const btnTiempoDeEspera = document.getElementById("btn-tiempo-de-espera");

  btnTiempoDeEspera.addEventListener('click', () => {
    const tiempoDeEspera = pacientesAtendidos.reduce((valorPrevio, valorActual) => valorPrevio + valorActual.espera, 0)/ pacientesAtendidos.length;
    alert(`Tiempo de espera total ${tiempoDeEspera}`)
    console.log (tiempoDeEspera);
  } ) 

  tabla.innerHTML = contenido;
  console.log(doctores);

  const btnPrecioConsulta = document.getElementById('btn-precio-consulta');

  btnPrecioConsulta.addEventListener('click', function() {
    const pacientesTotal = {};

    for (const paciente of pacientesAtendidos) {
      const {rut, nombre, precio} = paciente;

      if (!(rut in pacientesTotal)) {
        pacientesTotal[rut] = {
          nombre,
          precio,
          cantidad: 0,
        }
      }

      pacientesTotal[rut].cantidad++;
    }

    let mensaje = '';

    for (const rut in pacientesTotal) {
      const fnCantidad = calcularCosto(pacientesTotal[rut].precio);
      mensaje += `${pacientesTotal[rut].nombre}: ${fnCantidad(pacientesTotal[rut].cantidad)}\n`
    }

    alert(mensaje);
  });

  const btnHorasDoctor = document.getElementById ('btn-horas-doctor');
    btnHorasDoctor.addEventListener('click', function() {
    const horasDoctor = {};
    calcularHorasDoctor(horasDoctor, pacientesAtendidos);
    
    let mensaje = '';

    for (const doctor in horasDoctor) {
      mensaje += `El doctor ${doctor} atendio a ${horasDoctor[doctor]} pacientes\n`;
    }

    alert(mensaje);
  });

}).catch(error => {
  alert('error')
})

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

