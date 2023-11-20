window.onload = () => {
    fetch('https://apiv1.geoapi.es/comunidades?type=JSON&key=510423df45ea3ba2747db824da69bd64af5a8f8b22528645253028862e6749dc&sandbox=1')
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error('Error en la solicitud' + respuesta.status);
            }
            return respuesta.json();
        })
        .then(function (data) {
            var comunidades = document.getElementById('comunidades');
            for (var element of data.data) {
                var option = document.createElement("option");
                option.innerHTML = element.COM;
                option.value = element.CCOM;
                comunidades.appendChild(option);
            }
        })

    comunidades.addEventListener('change', function (e) {
        let com = document.getElementById('provincia');
        if (com != null) {
            com.remove();
        }

        fetch(`https://apiv1.geoapi.es/provincias?CCOM=${e.target.value}&type=JSON&key=&sandbox=1`)
            .then(function (respuesta) {
                if (!respuesta.ok) {
                    throw new Error('Error en la solicitud' + respuesta.status);
                }
                return respuesta.json();
            })
            .then((data) => {
                creaOption(data, 'PRO', 'CPRO', 'provincia');
                var provincias = document.getElementById('provincia');
                provincias.addEventListener('change', (e) => {
                    let provinciaValue=e.target.value
                    let poblacion = document.getElementById('poblacion');
                    if (poblacion != null) {
                        poblacion.remove();
                    }
                    fetch(`https://apiv1.geoapi.es/municipios?CPRO=${provinciaValue}&type=JSON&key=&sandbox=1`)
                        .then((respuesta) => {
                            if (!respuesta.ok) {
                                throw new Error('Error en la solicitud' + respuesta.status);
                            }
                            return respuesta.json();
                        })
                        .then((data) => {
                            creaOption(data, 'DMUN50', 'CPRO', 'poblacion','CMUM');
                            var poblacion = document.getElementById('poblacion');
                            // siguiente
                            poblacion.addEventListener('change', (ev) => {
                                let nucleo = document.getElementById('nucleo');
                                if (nucleo != null) {
                                    nucleo.remove();
                                }
                                codigos=ev.target.value.split(';')
                                fetch(`https://apiv1.geoapi.es/poblaciones?CPRO=${codigos[0]}&CMUM=${codigos[1]}&type=JSON&key=&sandbox=1`)
                                    .then((respuesta) => {
                                        if (!respuesta.ok) {
                                            throw new Error('Error en la solicitud' + respuesta.status);
                                        }
                                        return respuesta.json();
                                    })
                                    .then((data1) => {
                                        creaOption(data1, 'NENTSI50', 'CPRO', 'nucleo','CNUM');
                                        var nucleo = document.getElementById('nucleo');
                                    })
                            })
                        })
                })
            })
    })
}

function creaOption(data, result, codResult, containerID, segundoCodigo) {
    var comunidades = document.getElementById('contenedorForm');
    let select = document.createElement('select');
    comunidades.appendChild(select);
    select.id = containerID;

    for (var element of data.data) {
        var option = document.createElement("option");
        option.innerHTML = element[result];

        if (segundoCodigo) {
            option.value = element[codResult] + ";" + element[segundoCodigo];
        } else {
            option.value = element[codResult];
        }

        select.appendChild(option);
    }
}
