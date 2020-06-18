import React, { Component } from "react";
import PersonasList from "./PersonasList";
import PersonasForm from "./PersonasForm";

class PersonasView extends Component {
  render() {
    return (
      <div>
        <h2>Mantenedor de personas</h2>
        <PersonasForm />
        <PersonasList />
      </div>
    );
  }
}

export default PersonasView;
