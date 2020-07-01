import { rutValidate } from "rutfunctions";

export const validacionesMensajesPersonalizados = {
  required: "Este campo es requerido",
  email: "Formato de email inválido",
  integer: "Este campo admite sólo números",
};

export const validacionesPersonalizadas = {
  alpha_space: {
    message: "Sólo están permitidas las letras y espacios",
    rule: (val, params, validator) => {
      return validator.helpers.testRegex(val, /^[A-Za-záÁéÉíÍóÓúÚñÑ\s]+$/g);
    },
  },
  alpha_num_space: {
    message: "Sólo están permitidas las letras, números y espacios",
    rule: (val, params, validator) => {
      return validator.helpers.testRegex(val, /^[A-Za-z0-9áÁéÉíÍóÓúÚñÑ\s]+$/g);
    },
  },
  texto: {
    message: "Sólo están permitidas las letras, números, espacios y puntuación",
    rule: (val, params, validator) => {
      return validator.helpers.testRegex(
        val,
        /^[A-Za-z0-9-#°.,:;áÁéÉíÍóÓúÚñÑ\s]+$/g
      );
    },
  },
  telefono: {
    message: "Formato de teléfono incorrecto",
    rule: (val, params, validator) => {
      return (
        validator.helpers.testRegex(val, /^[0-9]+$/g) &&
        val.toString().length === 9
      );
    },
  },
  direccion: {
    message: "Formato de dirección no válido",
    rule: (val, params, validator) => {
      return validator.helpers.testRegex(
        val,
        /^[A-Za-z0-9-#°.,áÁéÉíÍóÓúÚñÑ\s]+$/g
      );
    },
  },
  rut: {
    message: "Formato de rut incorrecto",
    rule: (val, params, validator) => {
      return (
        validator.helpers.testRegex(
          val,
          /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/i
        ) && params.indexOf(val) === -1
      );
    },
  },
  rut_valido: {
    message: "El rut no existe",
    rule: (val, params, validator) => {
      return rutValidate(val);
    },
  },
  seleccion: {
    message: "Debes seleccionar una alternativa",
    rule: (val, params, validator) => {
      return val !== -1 && val !== "-1";
    },
  },
  rangofecha: {
    message: "El rango de la fecha no parece el apropiado",
    rule: (val, params, validator) => {
      return (
        new Date(val) < new Date() && new Date(val) > new Date("1900-01-01")
      );
    },
  },
};
