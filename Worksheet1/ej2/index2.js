window.onload=()=>{
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWZhLTA2LUBob3RtYWlsLmNvbSIsImp0aSI6IjliMDM2MmY3LTFiMDktNDU5NC1iZmIxLTFlNWRjZmZmMjJiMCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzAwNTUwNjg5LCJ1c2VySWQiOiI5YjAzNjJmNy0xYjA5LTQ1OTQtYmZiMS0xZTVkY2ZmZjIyYjAiLCJyb2xlIjoiIn0.2yEcYttof1CsdlDfLPfnbGcTkiikHirWTmVHRNYXM0Y",
        "method": "GET",
        "headers": {
          "cache-control": "no-cache"
        }
      }
      
      fetch(settings.url, {
        method: settings.method,
        headers: settings.headers
    })
    .then(response => response.json())
    .then(respuesta => {
        if (respuesta && respuesta.datos) {
            var datosUrl = respuesta.datos; // URL que contiene los datos reales

            // Hacer una segunda solicitud para obtener los datos reales
            fetch(datosUrl, {
                method: "GET"
            })
            .then(datosResponse => datosResponse.json())
            .then(datos => {
                console.log(datos); // Aquí tienes los datos reales de las estaciones
            })
            .catch(error => {
                console.error('Error en la segunda solicitud fetch:', error);
            });
        }
    })
    .catch(error => {
        console.error('Error en la primera solicitud fetch:', error);
    });
}