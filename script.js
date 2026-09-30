// ==============================
// CONEXIÓN CON SUPABASE
// ==============================

const SUPABASE_URL = "https://nlaushunmdswlromtlho.supabase.co";
const SUPABASE_KEY = "sb_publishable_NMOqt5Tp_91WZ0V9ZMU65Q_rOmj9ELM";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("CONEXIÓN CARGADA");


// ==============================
// FORMULARIO
// ==============================

const formulario = document.querySelector(".formulario");

formulario.addEventListener("submit", async function(evento) {

    evento.preventDefault();


    // ==============================
    // OBTENER DATOS
    // ==============================

    const nombre = document.querySelector("#nombre").value.trim();

    const fecha = document.querySelector("#fecha").value;

    const avisosSeleccionados = document.querySelectorAll(
        'input[name="aviso"]:checked'
    );


    // ==============================
    // VALIDACIÓN
    // ==============================

    if (nombre === "") {
        alert("Por favor, escriba su nombre completo.");
        return;
    }

    if (fecha === "") {
        alert("Por favor, seleccione una fecha de Santa Cena.");
        return;
    }

    if (avisosSeleccionados.length === 0) {
        alert("Por favor, seleccione al menos un aviso.");
        return;
    }


    // ==============================
    // CONVERTIR AVISOS EN TEXTO
    // ==============================

    const avisos = [];

    avisosSeleccionados.forEach(function(aviso) {
        avisos.push(aviso.value);
    });

    const avisosTexto = avisos.join(", ");


    // ==============================
    // ENVIAR A SUPABASE
    // ==============================

    const { data, error } = await supabaseClient
        .from("registros")
        .insert([
            {
                "Nombre": nombre,
            "Fecha_Santa_Cena": fecha,
            "avisos": avisosTexto
            }
        ]);


    // ==============================
    // COMPROBAR RESULTADO
    // ==============================

    if (error) {

        console.error("ERROR DE SUPABASE:", error.message);
console.error("DETALLE:", error);
        alert(
            "No se pudo guardar el registro.\n\n" +
            "Revise la conexión con Supabase."
        );

        return;
    }


    // ==============================
    // CONFIRMACIÓN
    // ==============================

    alert(
        "Registro guardado correctamente.\n\n" +
        "Su aviso ha sido registrado para la Santa Cena seleccionada."
    );


    // ==============================
    // LIMPIAR FORMULARIO
    // ==============================

    formulario.reset();

});