const api = {
    key: '9e122cd782b2d0333f5fe4e7fa192062',
    url: `https://api.openweathermap.org/data/2.5/weather`
}
const map = document.getElementById('map');
const clima = document.getElementById('clima');
const ciudad = document.getElementById('ciudad');
const fecha = document.getElementById('fecha');
const temperaturaImg = document.getElementById('temperaturaImg');
const imagenclima = document.getElementById('imagenclima');
const temperatura = document.getElementById('temperatura-actual');
const estado = document.getElementById('estado');
const temperaturamaxmin = document.getElementById('temperatura-min-max');


async function encontrar(query) {
    try {
       
      const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
      const data = await response.json();
      clima.style.display = 'block';
      ciudad.innerHTML = `${data.name}, ${data.sys.country}`;
      fecha.innerHTML = (new Date()).toLocaleDateString();
      temperatura.innerHTML = toCelsius(data.main.temp);
      estado.innerHTML = data.weather[0].description;
      console.log(data);
      temperaturamaxmin.innerHTML = `${toCelsius(data.main.temp_min)}c / ${toCelsius(data.main.temp_max)}c`;
      imagenEstado(data); 
      updateImages(data);
      
    } catch (err) {
      console.log(err);
      alert('Error,Ingrese nuevamente');
    }
  }


  function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }
  

function onSubmit(event) {

    event.preventDefault();
    encontrar(buscador.value);

}
function imagenEstado(data) {

  const mensajeClima = data.weather[0].description;
  console.log(mensajeClima);
  let src = 'imagenes/soleado.png';

  if (mensajeClima == "cielo claro"){

    src = 'imagenes/soleado.png';

  }else if ((mensajeClima == "muy nuboso") || (mensajeClima == "algo de nubes")||(mensajeClima== "nubes")||(mensajeClima== "nubes dispersas")){
    src = 'imagenes/nublado.png';

  }else if((mensajeClima == "lluvia ligera") || (mensajeClima== "lluvia moderada")) {
    src = 'imagenes/lluvia.png';
  }
  

  imagenclima.src = src;
  console.log(imagenclima);

}


function updateImages(data) {
    const temp = toCelsius(data.main.temp);
    let src = 'imagenes/temperatura.png';
    if (temp > 26) {
      src = 'imagenes/temperatura-alta.png';
    } else if (temp < 20) {
      src = 'imagenes/temperatura-baja.png';
    }
    temperaturaImg.src = src;
  }


const buscar = document.getElementById('buscar');
const buscador = document.getElementById('buscador');
buscar.addEventListener('submit', onSubmit, true);


  
