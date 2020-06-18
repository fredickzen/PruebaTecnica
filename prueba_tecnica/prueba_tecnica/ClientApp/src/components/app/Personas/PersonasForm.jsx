import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
class PersonasForm extends Component {
  //State inicial
  state = { visible: false, edit: false, persona: {} };
  //Refs

  mostrarFormulario = (visible) => {
    this.setState({ visible });
  };
  guardarPersona = (e) => {
    e.preventDefault();
    this.mostrarFormulario(false);
  };
  render() {
    //En caso que esté deshabilitado el modo visible
    if (!this.state.visible) {
      return (
        <div className="rigth-button">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => this.mostrarFormulario(true)}
          >
            <FontAwesomeIcon icon={faUser} /> Nueva persona
          </button>
        </div>
      );
    }
    //Cuando se activa el modo visible
    //Validar si se encuetra en modo edición para el título
    const titulo = this.state.edit ? "Editar persona" : "Crear nueva persona";
    return (
      <div>
        <h2>{titulo}</h2>
        <form onSubmit={this.guardarPersona}>
          <div className="rigth-button">
            <input
              type="submit"
              className="btn btn-outline-success"
              value="Guardar"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default PersonasForm;
