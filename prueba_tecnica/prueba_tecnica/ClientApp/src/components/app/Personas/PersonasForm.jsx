import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { splitRut, toDateInput } from "../../../utils/formats";
import SimpleReactValidator from "simple-react-validator";
import { rutFormat, rutValidate } from "rutfunctions";
import Axios from "axios";
import { env } from "../../../env/.env";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class PersonasForm extends Component {
  //State inicial
  state = {
    visible: false,
    edit: false,
    loading: false,
    persona: {},
    regiones: [],
    ciudades: [],
    comunas: [],
  };
  //Refs
  runRef = React.createRef();
  nombresRef = React.createRef();
  apellidoPaternoRef = React.createRef();
  apellidoMaternoRef = React.createRef();
  emailRef = React.createRef();
  sexoMRef = React.createRef();
  sexoFRef = React.createRef();
  fechaNacimientoRef = React.createRef();
  regionCodigoRef = React.createRef();
  ciudadCodigoRef = React.createRef();
  comunaCodigoRef = React.createRef();
  direccionRef = React.createRef();
  telefonoRef = React.createRef();
  observacionesRef = React.createRef();
  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      messages: {
        required: "Este campo es requerido",
        email: "Formato de email inválido",
        integer: "Este campo admite sólo números",
        alpha_space: "Sólo están permitidas las letras y espacios",
        alpha_num_space: "Sólo están permitidas las letras, números y espacios",
        alpha_num_dash_space:
          "Sólo están permitidas las letras, números, guiones y espacios",
      },
      validators: {
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
              new Date(val) < new Date() &&
              new Date(val) > new Date("1900-01-01")
            );
          },
        },
      },
    });
  }

  componentDidMount() {
    const { visible, edit, persona, loading } = this.props;
    this.setState({
      visible,
      edit,
      persona,
      loading,
    });
    this.getRegiones();
  }
  getRegiones = () => {
    Axios.get(env.apiUrl + "Regions").then((res) => {
      if (res.status === 200) {
        let respuesta = [{ value: "-1", label: "Seleccione" }];
        const regiones = res.data.map((region) => ({
          value: region.codigo,
          label: region.nombreOficial,
        }));
        this.setState({
          regiones: [...respuesta, ...regiones],
        });
        if (this.state.loading) {
          this.regionCodigoRef.current.value = this.state.persona.regionCodigo;
        }

        this.getCiudades();
      } else {
        this.setState({
          regiones: [{ value: -1, label: "No hay regiones" }],
        });
      }
    });
  };

  getCiudades = () => {
    const RegionSeleccionada = this.regionCodigoRef.current
      ? this.regionCodigoRef.current.value
      : -1;
    Axios.get(env.apiUrl + `Ciudads/${RegionSeleccionada}`).then((res) => {
      if (res.status === 200) {
        let respuesta = [{ value: "-1", label: "Seleccione" }];
        const ciudades = res.data.map((region) => ({
          value: region.codigo,
          label: region.nombre,
        }));
        this.setState({
          ciudades: [...respuesta, ...ciudades],
        });
        if (this.state.loading) {
          this.ciudadCodigoRef.current.value = this.state.persona.ciudadCodigo;
        }

        this.getComunas();
      } else {
        this.setState({
          ciudades: [{ value: -1, label: "Seleccione" }],
        });
      }
    });
  };

  getComunas = () => {
    const RegionSeleccionada = this.regionCodigoRef.current
      ? this.regionCodigoRef.current.value
      : -1;
    const ComunaSeleccionada = this.ciudadCodigoRef.current
      ? this.ciudadCodigoRef.current.value
      : -1;
    Axios.get(
      env.apiUrl + `Comunas/${RegionSeleccionada}/${ComunaSeleccionada}`
    ).then((res) => {
      if (res.status === 200) {
        let respuesta = [{ value: "-1", label: "Seleccione" }];
        const comunas = res.data.map((region) => ({
          value: region.codigo,
          label: region.nombre,
        }));
        this.setState({
          comunas: [...respuesta, ...comunas],
        });
        if (this.state.loading) {
          this.comunaCodigoRef.current.value = this.state.persona.comunaCodigo;
          this.setState({ loading: false });
        }
      } else {
        this.setState({
          comunas: [{ value: -1, label: "Seleccione" }],
        });
      }
    });
  };

  mostrarFormulario = (visible) => {
    this.setState({ visible });
  };

  resetFormulario = () => {
    this.setState({ persona: {} });
    this.mostrarFormulario(false);
    this.getRegiones();
  };

  changeState = () => {
    //Determinar si existe sexo marcado
    const sexo =
      this.sexoFRef.current.checked || this.sexoMRef.current.checked ? 1 : -1;

    //Formateo de rut
    let run = rutFormat(this.runRef.current.value);
    run = run === "-" ? "" : run;
    this.runRef.current.value = run;

    //Cambio de estado
    const persona = {
      run,
      nombres: this.nombresRef.current.value,
      apellidoPaterno: this.apellidoPaternoRef.current.value,
      apellidoMaterno: this.apellidoMaternoRef.current.value,
      sexo,
      email: this.emailRef.current.value,
      fechaNacimiento: this.fechaNacimientoRef.current.value,
      regionCodigo: this.regionCodigoRef.current.value,
      ciudadCodigo: this.ciudadCodigoRef.current.value,
      comunaCodigo: this.comunaCodigoRef.current.value,
      direccion: this.direccionRef.current.value,
      telefono: this.telefonoRef.current.value,
      observaciones: this.observacionesRef.current.value,
    };
    this.setState({
      persona,
    });
    //Comentado para mejorar la experiencia
    // this.validator.showMessages();
    // this.forceUpdate();
  };

  crearPersona = (persona) => {
    Axios.post(env.apiUrl + "Personas", persona)
      .then(
        (res) => {
          this.props.listarPersonas();
          this.resetFormulario();
          Swal.fire(
            "Creación correcta",
            "Persona creada con éxito.",
            "success"
          );
        },
        (error) => {
          Swal.fire(
            "Error",
            "Se ha producido un error al ejecutar la tarea, por favor contactarse con el administrador del sistema.",
            "danger"
          );
        }
      )
      .catch((error) => {
        Swal.fire(
          "Error",
          "Se ha producido un error al ejecutar la tarea, por favor contactarse con el administrador del sistema.",
          "danger"
        );
      });
  };

  guardarPersona = (e) => {
    e.preventDefault();
    //Validación de campos antes de guardar
    this.changeState();
    if (this.validator.allValid()) {
      //Parseo de variables validadas para ser enviadas a SQL
      const sexoCodigo = this.sexoMRef.current.checked ? 1 : 2;
      const { runCuerpo, runDigito } = splitRut(this.runRef.current.value);
      const persona = {
        sexoCodigo,
        runCuerpo,
        runDigito,
        nombres: this.nombresRef.current.value,
        apellidoPaterno: this.apellidoPaternoRef.current.value,
        apellidoMaterno: this.apellidoMaternoRef.current.value,
        email: this.emailRef.current.value,
        fechaNacimiento: this.fechaNacimientoRef.current.value,
        regionCodigo: parseInt(this.regionCodigoRef.current.value),
        ciudadCodigo: parseInt(this.ciudadCodigoRef.current.value),
        comunaCodigo: parseInt(this.comunaCodigoRef.current.value),
        direccion: this.direccionRef.current.value,
        telefono: parseInt(this.telefonoRef.current.value),
        observaciones: this.observacionesRef.current.value,
      };
      if (this.state.edit) {
        this.props.actualizarPersona(persona);
      } else {
        this.crearPersona(persona);
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    //Redirección finalizada la edición
    if (!this.state.visible) {
      //En caso que esté deshabilitado el modo visible
      return (
        <div className="rigth-button">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => this.mostrarFormulario(true)}
          >
            <FontAwesomeIcon icon={faUser} /> Crear nueva persona
          </button>
        </div>
      );
    }

    //Definir variable personas para los valores por defecto
    const persona = this.state.persona;
    //Cuando se activa el modo visible
    //Validar si se encuetra en modo edición para el título
    const titulo = this.state.edit ? "Editar persona" : "Crear nueva persona";
    const backAction = this.state.edit ? (
      <Link className="btn btn-outline-secondary" to="/">
        Volver
      </Link>
    ) : (
      <input
        type="reset"
        className="btn btn-outline-secondary"
        onClick={this.resetFormulario}
        value="Cancelar"
      />
    );
    return (
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4>{titulo}</h4>
        </div>
        <div className="card-body">
          <form onSubmit={this.guardarPersona} onChange={this.changeState}>
            <div className="row">
              <div className="form-group col-12 row">
                <label
                  htmlFor="run"
                  className="form-label col-12 col-sm-6 col-md-4 col-lg-2 "
                >
                  R.U.N:
                </label>
                <div className="col-12 col-sm-6 col-md-4 col-lg-2 ">
                  <input
                    type="text"
                    id="run"
                    className="form-control"
                    placeholder="11.111.111-1"
                    defaultValue={persona.run}
                    ref={this.runRef}
                    maxLength="12"
                    onBlur={() => this.validator.showMessageFor("run")}
                  />
                  {this.validator.message(
                    "run",
                    this.state.persona.run,
                    "required|rut|rut_valido"
                  )}
                </div>
              </div>
              <div className="form-group col-12 row">
                <label
                  htmlFor="nombres"
                  className="form-label col-12 col-sm-6 col-md-4 col-lg-2"
                >
                  Nombres:
                </label>
                <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                  <input
                    type="text"
                    id="nombres"
                    className="form-control"
                    placeholder="Nombres"
                    defaultValue={persona.nombres}
                    ref={this.nombresRef}
                    maxLength="40"
                    onBlur={() => this.validator.showMessageFor("nombres")}
                  />
                  {this.validator.message(
                    "nombres",
                    this.state.persona.nombres,
                    "required|max:40|alpha_space"
                  )}
                </div>
                <div className="d-xl-none d-lg-none col-12">
                  <br />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <input
                    type="text"
                    id="ApellidoPaterno"
                    className="form-control"
                    placeholder="Apellido paterno"
                    defaultValue={persona.apellidoPaterno}
                    ref={this.apellidoPaternoRef}
                    maxLength="25"
                    onBlur={() =>
                      this.validator.showMessageFor("ApellidoPaterno")
                    }
                  />
                  {this.validator.message(
                    "ApellidoPaterno",
                    this.state.persona.apellidoPaterno,
                    "required|max:25|alpha_space"
                  )}
                </div>
                <div className="col-12 d-sm-none">
                  <br />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <input
                    type="text"
                    id="apellidoMaterno"
                    className="form-control"
                    placeholder="Apellido materno"
                    defaultValue={persona.apellidoMaterno}
                    ref={this.apellidoMaternoRef}
                    maxLength="25"
                    onBlur={() =>
                      this.validator.showMessageFor("apellidoMaterno")
                    }
                  />
                  {this.validator.message(
                    "apellidoMaterno",
                    this.state.persona.apellidoMaterno,
                    "required|max:25|alpha_space"
                  )}
                </div>
              </div>

              <div className="form-group col-12 row">
                <label
                  htmlFor="email"
                  className="form-label col-12 col-sm-6 col-md-4 col-lg-2 "
                >
                  Email:
                </label>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 ">
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="correo@correo.cl"
                    defaultValue={persona.email}
                    ref={this.emailRef}
                    maxLength="75"
                    onBlur={() => this.validator.showMessageFor("email")}
                  />
                  {this.validator.message(
                    "email",
                    this.state.persona.email,
                    "required|max:75|email"
                  )}
                </div>
              </div>
              <div className="form-group col-12 row">
                <label
                  htmlFor="sexo"
                  className="form-label col-12 col-sm-6 col-md-4 col-lg-2 "
                >
                  Sexo:
                </label>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 ">
                  <label htmlFor="sexoM">
                    <input
                      type="radio"
                      name="sexo"
                      id="sexoM"
                      className=""
                      value="1"
                      defaultChecked={persona.sexoCodigo === 1}
                      ref={this.sexoMRef}
                    />{" "}
                    Masculino
                  </label>
                  &nbsp;
                  <label htmlFor="sexoF">
                    <input
                      type="radio"
                      name="sexo"
                      id="sexoF"
                      className=""
                      value="1"
                      defaultChecked={persona.sexoCodigo === 2}
                      ref={this.sexoFRef}
                    />{" "}
                    Femenino
                  </label>
                  {this.validator.message(
                    "sexo",
                    this.state.persona.sexo,
                    "seleccion"
                  )}
                </div>
              </div>
              <div className="form-group col-12 row">
                <label
                  htmlFor="fechaNacimiento"
                  className="form-label col-12 col-sm-6 col-md-4 col-lg-2 "
                >
                  Fecha nacimiento:
                </label>
                <div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
                  <input
                    type="date"
                    id="fechaNacimiento"
                    className="form-control"
                    placeholder="01-01-1980"
                    defaultValue={toDateInput(persona.fechaNacimiento)}
                    ref={this.fechaNacimientoRef}
                    onBlur={() =>
                      this.validator.showMessageFor("fechaNacimiento")
                    }
                  />
                  {this.validator.message(
                    "fechaNacimiento",
                    this.state.persona.fechaNacimiento,
                    "required|rangofecha"
                  )}
                </div>
              </div>
              <div className="form-group col-12 row">
                <label
                  htmlFor="regionCodigo"
                  className="form-label col-12 col-sm-6 col-md-4 col-lg-2 "
                >
                  Región:
                </label>
                <div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
                  <select
                    className="form-control"
                    ref={this.regionCodigoRef}
                    onChange={this.getCiudades}
                    onBlur={() => this.validator.showMessageFor("regionCodigo")}
                  >
                    {this.state.regiones.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                  {this.validator.message(
                    "regionCodigo",
                    this.state.persona.regionCodigo,
                    "seleccion"
                  )}
                </div>
              </div>
              <div className="form-group col-12 row">
                <label
                  htmlFor="ciudadCodigo"
                  className="form-label col-12 col-sm-6 col-md-4 col-lg-2 "
                >
                  Ciudad:
                </label>
                <div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
                  <select
                    className="form-control"
                    ref={this.ciudadCodigoRef}
                    onChange={this.getComunas}
                    onBlur={() => this.validator.showMessageFor("ciudadCodigo")}
                  >
                    {this.state.ciudades.map((ciudad) => (
                      <option key={ciudad.value} value={ciudad.value}>
                        {ciudad.label}
                      </option>
                    ))}
                  </select>
                  {this.validator.message(
                    "ciudadCodigo",
                    this.state.persona.ciudadCodigo,
                    "seleccion"
                  )}
                </div>
              </div>
              <div className="form-group col-12 row">
                <label
                  htmlFor="comunaCodigo"
                  className="form-label col-12 col-sm-6 col-md-4 col-lg-2 "
                >
                  Comuna:
                </label>
                <div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
                  <select
                    className="form-control"
                    ref={this.comunaCodigoRef}
                    onBlur={() => this.validator.showMessageFor("comunaCodigo")}
                  >
                    {this.state.comunas.map((comuna) => (
                      <option key={comuna.value} value={comuna.value}>
                        {comuna.label}
                      </option>
                    ))}
                  </select>
                  {this.validator.message(
                    "comunaCodigo",
                    this.state.persona.comunaCodigo,
                    "seleccion"
                  )}
                </div>
              </div>
              <div className="form-group col-12 row">
                <label
                  htmlFor="direccion"
                  className="form-label col-12 col-sm-6 col-md-4 col-lg-2 "
                >
                  Dirección:
                </label>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 ">
                  <input
                    type="text"
                    id="direccion"
                    className="form-control"
                    placeholder="Dirección"
                    ref={this.direccionRef}
                    defaultValue={persona.direccion}
                    maxLength="75"
                    onBlur={() => this.validator.showMessageFor("direccion")}
                  />
                  {this.validator.message(
                    "direccion",
                    this.state.persona.direccion,
                    "required|max:75|alpha_num_dash_space"
                  )}
                </div>
              </div>
              <div className="form-group col-12 row">
                <label
                  htmlFor="telefono"
                  className="form-label col-12 col-sm-6 col-md-4 col-lg-2 "
                >
                  Teléfono:
                </label>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 ">
                  <input
                    type="text"
                    id="telefono"
                    className="form-control"
                    placeholder="+56999999999"
                    ref={this.telefonoRef}
                    defaultValue={persona.telefono}
                    maxLength="9"
                    onBlur={() => this.validator.showMessageFor("telefono")}
                  />
                  {this.validator.message(
                    "telefono",
                    this.state.persona.telefono,
                    "required|max:9|integer"
                  )}
                </div>
              </div>
              <div className="form-group col-12 row">
                <label
                  htmlFor="observaciones"
                  className="form-label col-12 col-sm-6 col-md-4 col-lg-2 "
                >
                  Observaciones:
                </label>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 ">
                  <textarea
                    type="text"
                    id="observaciones"
                    className="form-control"
                    placeholder="Observaciones"
                    rows="5"
                    ref={this.observacionesRef}
                    defaultValue={persona.observaciones}
                    maxLength="200"
                    onBlur={() =>
                      this.validator.showMessageFor("observaciones")
                    }
                  />
                  {this.validator.message(
                    "observaciones",
                    this.state.persona.observaciones,
                    "required|max:200|alpha_num_dash_space"
                  )}
                </div>
              </div>
            </div>
            <div className="rigth-button">
              <input
                type="submit"
                className="btn btn-success"
                value="Guardar"
              />
              {backAction}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PersonasForm;
