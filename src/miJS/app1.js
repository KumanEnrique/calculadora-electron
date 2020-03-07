/* constantes formulario uno */
const form = document.getElementById("form");
const tabla = document.getElementById("tabla");

const base = document.getElementById("Base");
const inferior = document.getElementById("inferior");
const eInferior = document.getElementById("eInferior");
const porcentaje = document.getElementById("porcentaje");
const impuestoMarginal = document.getElementById("impuestoMarginal");
const cuotaFija = document.getElementById("cuotaFija");
const impuesto = document.getElementById("impuesto");
const ingresosMenores = document.getElementById("ingresosMenores");
const subsidioEmpleos = document.getElementById("subsidioEmpleos");
const impuestoPeriodo = document.getElementById("impuestoPeriodo");
const neto = document.getElementById("neto");

base.addEventListener("keyup", (e) => {
  const ingreso = Number(e.target.value);
  if(ingreso >= 1){
    const buscar1T = buscar1(ingreso);

    inferior.value = buscar1T[0];
    eInferior.value = (ingreso - inferior.value).toFixed(2);
    porcentaje.value = buscar2(buscar1T[1]);
    impuestoMarginal.value = (eInferior.value * (buscar2(buscar1T[1]) / 100)).toFixed(2);
    cuotaFija.value = buscar3(buscar1T[1]);
    impuesto.value = (Number(cuotaFija.value) + Number(impuestoMarginal.value)).toFixed(2);
    ingresosMenores.value = ingreso;
    const buscar2T = buscarSubsidio(ingreso);
    subsidioEmpleos.value = buscarSubsidio2(buscar2T[1]);
    impuestoPeriodo.value = (impuesto.value - subsidioEmpleos.value).toFixed(2);
    neto.value = ingreso - impuestoPeriodo.value;
  }
})
form.addEventListener("submit", (e) => {
  e.preventDefault();
})
tabla.addEventListener("click", (e) => {
  e.target.parentNode.parentNode.remove();
})
$(document).ready(function () {
  $('#tabla').DataTable({
    dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ],
    "language": {
      "decimal": "",
      "emptyTable": "No hay datos en la tabla",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
      "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
      "infoFiltered": "(filtered from _MAX_ total entries)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Show _MENU_ entries",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Ninguna coincidencia encontrada",
      "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Anterior"
      },
      "aria": {
        "sortAscending": ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
      }
    }
  });
});
const eliminar =`<button class="btn btn-danger">Eliminar</button>`
$(document).ready(function () {
  var t = $('#tabla').DataTable();

  $('#addRow').on('click', function () {
    t.row.add([
      "$" + base.value,
      "$" + inferior.value,
      "$" + eInferior.value,
      porcentaje.value + "%",
      "$" + impuestoMarginal.value,
      "$" + cuotaFija.value,
      "$" + impuesto.value,
      "$" + ingresosMenores.value,
      "$" + subsidioEmpleos.value,
      "$" + impuestoPeriodo.value,
      "$" + neto.value,
      eliminar
    ]).draw(false);
  });
  // Automatically add a first row of data
  //$('#addRow').click();
});
/* inversoInput.addEventListener("keyup",(e)=>{
  const valor = e.target.value
  subtotal.value = (Number(valor) * 100 / 116 ).toFixed(2);
  iva.value = (Number(subtotal.value) * 16 / 100).toFixed(2);
  total.value = Number(valor);
}) */

/* funcion buscar   */
const tablaMensual = {
  inferior:[ 0.01, 578.53 , 4910.19, 8629.21 , 10031.08 , 12009.95 , 24222.32 , 38177.70 , 72887.51 , 97183.34 , 291550.01],
  superior:[ 578.52 , 4910.18 , 8629.20 , 10031.07 , 12009.94 , 24222.31 , 38177.69 , 72887.50 , 97183.33 , 291550.00 , " En adelante" ],
  fija:[ 0, 11.11 , 288.33 , 692.96 , 917.26 , 1271.87 , 3880.44 , 7162.74 , 17575.69 , 25350.35 , 91435.02  ],
  exec:[1.92, 6.40, 10.88, 16.00, 17.92, 21.36, 23.52, 30.00, 32.00, 34.00, 35.00, ]
}
const tablaSubsidio = {
  minimo:[ 0.01 , 1768.97 , 2653.39 , 3472.85 , 3537.88 , 4446.16 , 4717.19 , 5335.43 , 6224.68 , 7113.91 , 7382.34 ],
  maximo:[ 1768.96 , 2653.38 , 3472.84 , 3537.87 , 4446.15 , 4717.18 , 5335.42 , 6224.67 , 7113.90 , 7382.33 , 1000000.00 ],
  subsidio:[ 407.02 , 406.83 , 406.62 , 392.77 , 382.46 , 354.23 , 324.87 , 294.63 , 253.54 , 217.61 , 0 ]
}
function buscar1(num) {
  if (num >= 291550.01) {
    return [tablaMensual.inferior[tablaMensual.inferior.length - 1], tablaMensual.inferior.indexOf(tablaMensual.inferior[tablaMensual.inferior.length - 1])]
  } else if (num == 0) {
    return [num, 0]
  } else {
    for (let i = 0; i < tablaMensual.inferior.length; i++) {
      if (num < tablaMensual.inferior[i]) {
        return [tablaMensual.inferior[i - 1], tablaMensual.inferior.indexOf(tablaMensual.inferior[i - 1])]
      }
    }
  }
}
function buscar2(pos){
  return tablaMensual.exec[pos]
}
function buscar3(pos){
  return tablaMensual.fija[pos]
}
function buscarSubsidio(num){
  if(num >= 7382.34){
      return [tablaSubsidio.subsidio[tablaSubsidio.subsidio.length - 1],tablaSubsidio.subsidio.indexOf(tablaSubsidio.subsidio[tablaSubsidio.subsidio.length - 1] )]
  }else if(num == 0){
      return [num,0]
  } else {
    for (let i = 0; i < tablaSubsidio.subsidio.length; i++) {
      if (num < tablaSubsidio.minimo[i]) {
        return [tablaSubsidio.minimo[i-1],tablaSubsidio.minimo.indexOf( tablaSubsidio.minimo[i-1] )  ]
      }
    }
  }
}
function buscarSubsidio2(pos){
  return tablaSubsidio.subsidio[pos]
}