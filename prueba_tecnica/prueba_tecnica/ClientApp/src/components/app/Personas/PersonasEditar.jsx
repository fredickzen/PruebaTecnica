import React, { Component } from "react";
import PersonasForm from "./PersonasForm";
import Axios from "axios";
import { env } from "../../../env/.env";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class PersonasEditar extends Component {
  state = {
    persona: null,
    success: false,
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.editarPersona(id);
  }
  editarPersona = (id) => {
    Axios.get(env.apiUrl + `Personas/${id}`).then((res) => {
      this.setState({ persona: res.data });
    });
  };

  actualizarPersona = (persona) => {
    const id = this.props.match.params.id;
    persona.id = id;
    Axios.put(env.apiUrl + `Personas/${id}`, persona).then((res) => {
      this.setState({ success: true });
      Swal.fire(
        "Persona actualizada",
        "Persona actualizada con éxito.",
        "success"
      );
    });
  };
  render() {
    if (this.state.success) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        {this.state.persona && (
          <PersonasForm
            edit="true"
            loading="true"
            visible="true"
            persona={this.state.persona}
            actualizarPersona={this.actualizarPersona}
          />
        )}
      </React.Fragment>
    );
  }
}

export default PersonasEditar;
