// L -> LeafLet
// setView muestra el mapa. Luego [4.639386, -74.082412] representa la latitud (primer parametro) y la longitud (segundo parametro). 6 es el zoom que hago al mapa

// let map = L.map('map').setView([34.04915, -118.09462],18);

// //Agregar tileLayer mapa base desde openstreetmap
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// //Agregar tileLayer mapa base desde openstreetmap
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);


const btnSearch = document.getElementById('btn-search');
const inputEntered = document.getElementById('input-entered');
const formInput = document.getElementById('form-input');
let trackerInfoContainer = document.getElementById('tracker-info');

let value = '';

formInput.addEventListener("submit", e => {
    e.preventDefault();
})

inputEntered.addEventListener("input", () => {
    value = inputEntered.value; 
})

btnSearch.addEventListener("click", () => {
    loadData(value);

    value = '';
})

const loadData = async value => {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_IqPOC6NjD317MeQAT5ChtkDpMybN6&ipAddress=${value}`);      
    const data = await response.json();

    let dataIp = data;
    
    trackerInfoContainer.innerHTML = `
        <div>
            <p>ip address</p>
            <h2>${dataIp.ip}</h2>
        </div>
        <div>
            <p>location</p>
            <h2>${dataIp.location.region}, ${dataIp.location.city} ${dataIp.as.asn}</h2>
        </div>
        <div>
            <p>timezone</p>
            <h2>UTC ${dataIp.location.timezone}</h2>
        </div>
        <div>
            <p>isp</p>
            <h2>${dataIp.isp}</h2>
        </div> 
    `;

    console.log(dataIp.location.lat);
    console.log(typeof dataIp.location.lat);
    console.log(dataIp.location.lng);
    console.log(typeof dataIp.location.lng);

    cargarMapa(dataIp.location.lat, dataIp.location.lng);
}

const cargarMapa = (latitud, longitud) => {
    const coord = [latitud, longitud]; 
    let map = L.map('mapa').setView(coord, 20);

    //Agregar tileLayer mapa base desde openstreetmap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.flyTo(coord, 20);
}




// const cargarMapa = (latitud, longitud) => {
//     document.getElementById('mapa').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
//     let osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' + ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
//     osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
//     var map = new L.Map('map');
//     map.setView([latitud, longitud], 20);
//     map.addLayer(osmLayer);
//     let validatorsLayer = new OsmJs.Weather.LeafletLayer({lang: 'en'});
//     map.addLayer(validatorsLayer);
// }




