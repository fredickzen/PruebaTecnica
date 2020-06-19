export const splitRut = (rut) => {
  const globalRut = rut.split("-");
  let runCuerpo = globalRut[0].split(".").join("");
  runCuerpo = parseInt(runCuerpo);
  const runDigito = globalRut.length > 1 ? globalRut[1] : 0;
  return { runCuerpo, runDigito };
};

export const toDateInput = (f) => {
  var fecha = new Date(f); //Fecha actual
  var mes = fecha.getMonth() + 1; //obteniendo mes
  var dia = fecha.getDate(); //obteniendo dia
  var ano = fecha.getFullYear(); //obteniendo año
  if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
  if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10
  return ano + "-" + mes + "-" + dia;
};
