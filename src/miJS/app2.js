/* constantes formulario uno */
const form = document.getElementById("form");
const body = document.getElementById("body");
const tabla = document.getElementById("tabla");

const inversoInput = document.getElementById("inversoINPUT");
const subtotal = document.getElementById("subtotal");
const iva = document.getElementById("iva");
const total = document.getElementById("total");
/* fin */
/* constantes formulario 2 */
const form2 = document.getElementById("form2");
const tabla2 = document.getElementById("tabla2");

const ivaInicial = document.getElementById("ivaInicial");
const base = document.getElementById("base");
const formIva2 = document.getElementById("formIva2");
const subtotalForm2 = document.getElementById("subtotalForm2");
const afecto = document.getElementById("afecto");
const totalForm2 = document.getElementById("totalForm2");
/* fin */
subtotal.addEventListener("keyup", (e) => {
  const ingreso = Number(e.target.value);
  iva.value = (ingreso * .16).toFixed(2);
  total.value = (Number(iva.value) + ingreso).toFixed(2);
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
  var counter = 1;

  $('#addRow').on('click', function () {
    t.row.add([
      "$" + subtotal.value ,
      "$" + iva.value ,
      "$" + total.value ,
      eliminar
    ]).draw(false);
  });
  // Automatically add a first row of data
  //$('#addRow').click();
});
inversoInput.addEventListener("keyup",(e)=>{
  const valor = e.target.value
  subtotal.value = (Number(valor) * 100 / 116 ).toFixed(2);
  iva.value = (Number(subtotal.value) * 16 / 100).toFixed(2);
  total.value = Number(valor);
})
/*-------------*/
let tempValor;
ivaInicial.addEventListener("keyup", (e) => {
  const ingreso = Number(e.target.value);
  base.value = (ingreso * 100)/ 16;
  formIva2.value = Number(base.value) * .16;
  subtotalForm2.value = Number(formIva2.value) + Number(base.value);
  afecto.value =  Number(subtotalForm2.value)
  // console.log(e.target.parentNode.parentNode[6].value )
  tempValor = Number(document.getElementById("afecto").value)
  console.log(tempValor)
})
totalForm2.addEventListener("keyup",(e)=>{
  const ingreso = Number(e.target.value)
  afecto.value = Math.abs(Number(tempValor) - ingreso)
})
form2.addEventListener("submit", (e) => {
  e.preventDefault();
})
tabla2.addEventListener("click", (e) => {
  e.target.parentNode.parentNode.remove();
})
$(document).ready(function () {
  $('#tabla2').DataTable({
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
const eliminar2 =`<button class="btn btn-danger">Eliminar</button>`
$(document).ready(function () {
  var t = $('#tabla2').DataTable();

  $('#addRow2').on('click', function () {
    t.row.add([
      "$" + ivaInicial.value ,
      "$" + base.value ,
      "$" + formIva2.value ,
      "$" + subtotalForm2.value ,
      "$" + afecto.value ,
      "$" + totalForm2.value,
      eliminar2
    ]).draw(false);
  });
  // Automatically add a first row of data
  //$('#addRow').click();
});