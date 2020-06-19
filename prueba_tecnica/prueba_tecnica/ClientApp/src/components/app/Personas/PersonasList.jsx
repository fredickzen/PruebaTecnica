import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { personasColumns } from "./PersonasColumns";
import { PaginacionOpciones, DefaultOptions } from "../global/datatableOptions";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import { env } from "../../../env/.env";
class PersonasList extends Component {
  state = {
    id: null,
  };
  editar = (id) => {
    this.setState({ id });
  };
  eliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar esta persona?",
      text: "Esta opción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.value) {
        Axios.delete(env.apiUrl + `Personas/${id}`).then((res) => {
          Swal.fire("Eliminada", "Persona eliminada con éxito.", "success");
          this.props.listarPersonas();
        });
      }
    });
  };
  render() {
    //Redirección a editor
    if (this.state.id) {
      return <Redirect to={`/editar/${this.state.id}`} />;
    }

    //Se añaden las personas a la tabla
    const personas = this.props.personas;
    //Se egregan las columnas a la tabla
    const columnas = [
      ...personasColumns,
      {
        name: "Acciones",
        sorteable: false,
        cell: (row) => {
          return (
            <React.Fragment>
              <button
                className="btn btn-sm btn-outline-warning"
                onClick={() => this.editar(row.id)}
              >
                <FontAwesomeIcon icon={faEdit} /> Editar
              </button>
              &nbsp;
              <button
                className="btn  btn-sm btn-outline-danger"
                onClick={() => this.eliminar(row.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Eliminar
              </button>
            </React.Fragment>
          );
        },
      },
    ];
    return (
      <div className="table-responsive PersonasList">
        <DataTable
          data={personas}
          columns={columnas}
          title="Personas registradas"
          pagination
          paginationComponentOptions={PaginacionOpciones}
          noDataComponent={DefaultOptions.noDataComponent}
          sorteable
          fixedHeader
          fixedHeaderScrollHeight="500px"
        ></DataTable>
      </div>
    );
  }
}

export default PersonasList;
