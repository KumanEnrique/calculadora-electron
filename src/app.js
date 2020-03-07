const form = document.getElementById("form");
const body = document.getElementById("body");
const tabla = document.getElementById("tabla");

const inversoInput = document.getElementById("inversoINPUT");
const subtotal = document.getElementById("subtotal");
const iva = document.getElementById("IVA");
const total = document.getElementById("total");
const ISRret = document.getElementById("ISRret");
const IVAret = document.getElementById("IVAret");
const neto = document.getElementById("neto");

subtotal.addEventListener("keyup", (e) => {
  const ingreso = Number(e.target.value);
  iva.value = (ingreso * .16).toFixed(2);
  total.value = (Number(iva.value) + ingreso).toFixed(2);
  ISRret.value = (ingreso * .1).toFixed(2);
  IVAret.value = ((iva.value / 3) * 2).toFixed(2);
  neto.value = (Number(total.value) - Number(ISRret.value) - Number(IVAret.value)).toFixed(2);
})

form.addEventListener("submit", (e) => {
  e.preventDefault();

/*   const fila = document.createElement("tr");
  const celda1 = document.createElement("td");
  const celda2 = document.createElement("td");
  const celda3 = document.createElement("td");
  const celda4 = document.createElement("td");
  const celda5 = document.createElement("td");
  const celda6 = document.createElement("td");
  const celda7 = document.createElement("td");
  const celda8 = document.createElement("td");

  celda1.innerText = 1;
  celda2.innerText = "$ " + subtotal.value;
  celda3.innerText = "$ " + iva.value;
  celda4.innerText = "$ " + total.value;
  celda5.innerText = "$ " + ISRret.value;
  celda6.innerText = "$ " + IVAret.value;
  celda7.innerText = "$ " + neto.value;
  celda8.innerHTML = `<button class="btn btn-danger">Eliminar</button>`;

  fila.appendChild(celda1);
  fila.appendChild(celda2);
  fila.appendChild(celda3);
  fila.appendChild(celda4);
  fila.appendChild(celda5);
  fila.appendChild(celda6);
  fila.appendChild(celda7);
  fila.appendChild(celda8);
  body.appendChild(fila); */
})
/* inverso.addEventListener("click", () => {
  const valor = Number(window.prompt("cual es el valor?"));
  neto.value = valor;
  subtotal.value = (Number(neto.value) * .04895104895 + Number(neto.value)).toFixed(2);
  iva.value = (subtotal.value * .16).toFixed(2)
  total.value = (Number(subtotal.value) + Number(iva.value)).toFixed(2)
  ISRret.value = (subtotal.value * .1).toFixed(2)
  IVAret.value = ((iva.value / 3) * 2).toFixed(2)
}) */
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
      "$" + subtotal.value,
      "$" + iva.value,
      "$" + total.value,
      "$" + ISRret.value,
      "$" + IVAret.value,
      "$" + neto.value,
      eliminar
    ]).draw(false);
  });

  // Automatically add a first row of data
  //$('#addRow').click();
});
inversoInput.addEventListener("keyup",(e)=>{
  const valor = e.target.value
  neto.value = valor;
  subtotal.value = (Number(neto.value) * .04895104895 + Number(neto.value)).toFixed(2);
  iva.value = (subtotal.value * .16).toFixed(2)
  total.value = (Number(subtotal.value) + Number(iva.value)).toFixed(2)
  ISRret.value = (subtotal.value * .1).toFixed(2)
  IVAret.value = ((iva.value / 3) * 2).toFixed(2)
  console.log(e.target.value)
})