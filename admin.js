// ==============================
// PANEL ADMINISTRATIVO
// ==============================

console.log("PANEL ADMINISTRATIVO CARGADO");


// ==============================
// CONFIGURACIÓN
// ==============================

const SUPABASE_KEY = "sb_publishable_NMOqt5Tp_91WZ0V9ZMU65Q_rOmj9ELM";

const selectorFecha =
    document.querySelector("#fechaAdmin");

const resultados =
    document.querySelector("#resultados");

const ultimaActualizacion =
    document.querySelector("#ultimaActualizacion");

const cerrarPanel =
    document.querySelector("#cerrarPanel");


// ==============================
// CÓDIGO DEL EQUIPO
// ==============================

const codigoEquipo = prompt(
    "Ingrese el código del equipo:"
);


// ==============================
// CONSULTAR REGISTROS
// ==============================

async function consultarRegistros() {

    const fechaSeleccionada =
        selectorFecha.value;

    if (fechaSeleccionada === "") {
        return;
    }


    try {

        const respuesta = await fetch(
            "https://nlaushunmdswlromtlho.supabase.co/functions/v1/consultar-avisos",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY
                },

                body: JSON.stringify({
                    code: codigoEquipo,
                    fecha: fechaSeleccionada
                })
            }
        );


        const resultado =
            await respuesta.json();


        // ==============================
        // ERROR
        // ==============================

        if (!respuesta.ok) {

            console.error(
                "Respuesta de Supabase:",
                resultado
            );

            resultados.innerHTML = `
                <h3>No se pudo consultar</h3>

                <p class="ayuda">
                    Verifique el código del equipo.
                </p>
            `;

            return;
        }


        // ==============================
        // ACTUALIZAR HORA
        // ==============================

        const horaActual =
            new Date();

        ultimaActualizacion.textContent =
            "Última actualización: " +
            horaActual.toLocaleTimeString("es-GT");


        // ==============================
        // SIN REGISTROS
        // ==============================

        if (
            !resultado.registros ||
            resultado.registros.length === 0
        ) {

            resultados.innerHTML = `
                <h3>Registros</h3>

                <p class="ayuda">
                    No hay avisos registrados
                    para esta Santa Cena.
                </p>
            `;

            return;
        }


        // ==============================
        // CONTADOR
        // ==============================

        let contenido = `

            <h3>Registros</h3>

            <p class="ayuda">
                Se encontraron
                <strong>
                    ${resultado.registros.length}
                </strong>
                registro(s) para esta Santa Cena.
            </p>

        `;


        // ==============================
        // TARJETAS
        // ==============================

        resultado.registros.forEach(
            function(registro, indice) {

                contenido += `

                    <div class="opcion">

                        <div>

                            <strong>
                                AVISO #${indice + 1}
                            </strong>

                            <span>
                                <b>Nombre:</b>
                                ${registro.Nombre}
                            </span>

                            <span>
                                <b>Aviso:</b>
                                ${
                                    registro.Avisos ||
                                    registro.avisos ||
                                    "Aviso registrado"
                                }
                            </span>

                        </div>

                    </div>

                `;

            }
        );


        resultados.innerHTML =
            contenido;


    } catch (error) {

        console.error(
            "Error:",
            error
        );

    }

}


// ==============================
// CAMBIO DE FECHA
// ==============================

selectorFecha.addEventListener(
    "change",
    consultarRegistros
);


// ==============================
// ACTUALIZACIÓN AUTOMÁTICA
// ==============================

setInterval(
    function() {

        consultarRegistros();

    },
    10000
);


// ==============================
// CERRAR PANEL
// ==============================

cerrarPanel.addEventListener(
    "click",
    function() {

        const confirmar =
            confirm(
                "¿Desea cerrar el panel administrativo?"
            );

        if (confirmar) {

            location.reload();

        }

    }
);