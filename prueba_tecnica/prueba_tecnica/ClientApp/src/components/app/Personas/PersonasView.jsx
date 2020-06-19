import React, { Component } from "react";
import PersonasList from "./PersonasList";
import PersonasForm from "./PersonasForm";
import Axios from "axios";
import { env } from "../../../env/.env";

class PersonasView extends Component {
  //State inicial
  state = { visible: false, edit: false, persona: {}, personas: [] };
  componentDidMount() {
    this.listarPersonas();
  }
  listarPersonas = () => {
    Axios.get(env.apiUrl + "Personas").then((res) => {
      this.setState({ personas: res.data });
    });
  };
  render() {
    return (
      <div>
        <h2>Mantenedor de personas</h2>
        <hr />
        {/* Crear y editar */}
        <PersonasForm
          visible={this.state.visible}
          edit={this.state.edit}
          persona={this.state.persona}
          listarPersonas={this.listarPersonas}
        />
        <br />
        {/* Listar, llamado a editar y eliminar */}
        <PersonasList
          personas={this.state.personas}
          editarPersona={this.editarPersona}
          listarPersonas={this.listarPersonas}
        />
      </div>
    );
  }
}

export default PersonasView;
