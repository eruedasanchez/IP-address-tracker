/*------------------------------------------*\
    #INICIALIZACION DEL MAPA CON LEAFLET JS
\*------------------------------------------*/

// Inicializacion del mapa solicitado en mobile/desktop preview
let map = L.map('mapa').setView([34.04915, -118.09462], 17);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

// Se agrega el icono que indica la ubicacion exacta de la IP por defecto
let icon = L.icon({
    iconUrl: '../assets/img/icon-location.svg',
    iconSize: [46,56],
    iconAnchor: [32,32]
});

L.marker([34.04915, -118.09462], {icon: icon}).addTo(map); // Se crea un marcador (icono) en las coordenadas indicadas y se lo agrega al mapa

/*------------------------------------------*\
    #OBTENCION DE DATOS DE IPIFY API
\*------------------------------------------*/

let value = '';

const btnSearch = document.getElementById('btn-search');
const inputEntered = document.getElementById('input-entered');
const formInput = document.getElementById('form-input');
let trackerInfoContainer = document.getElementById('tracker-info');

formInput.addEventListener("submit", e => {
    e.preventDefault(); // Se evita que se recargue la pagina cada vez que envio una direccion de IP
})

inputEntered.addEventListener("input", () => {
    value = inputEntered.value; 
})

btnSearch.addEventListener("click", () => {
    loadData(value);
    inputEntered.value = "";
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
    
    loadMap(dataIp.location.lat, dataIp.location.lng);
}

const loadMap = (lat, lng) => {
    const coord = [lat, lng];
    map.setView(coord, 17);
    L.marker(coord, {icon: icon}).addTo(map);  
}


/*---------------------------------------------------------------------------*\
    #ALGUNAS IP's UTILIZADAS PARA PROBAR EL CORRECTO FUNCIONAMIENTO

    // 181.46.139.172
    // 8.8.8.8
    // 192.212.174.101

\*----------------------------------------------------------------------------*/

