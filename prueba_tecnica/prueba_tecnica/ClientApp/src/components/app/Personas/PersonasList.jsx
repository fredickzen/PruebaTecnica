import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { env } from "../../../env/.env";
import { personasColumns } from "./PersonasColumns";
import { PaginacionOpciones } from "../global/datatableOptions";
class PersonasList extends Component {
  state = {
    personas: [],
  };
  componentDidMount() {
    Axios.get(env.apiUrl + "WeatherForecast").then((res) => {
      this.setState({ personas: res.data });
    });
  }
  editar = (id) => {
    console.log(id);
  };
  eliminar = (id) => {
    console.log(id);
  };
  render() {
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
                onClick={() => this.editar(row.summary)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              &nbsp;
              <button
                className="btn  btn-sm btn-outline-danger"
                onClick={() => this.eliminar(row.summary)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </React.Fragment>
          );
        },
      },
    ];
    return (
      <div className="table-responsive">
        <DataTable
          data={this.state.personas}
          columns={columnas}
          title="Personas registradas"
          pagination
          paginationComponentOptions={PaginacionOpciones}
          sorteable
          fixedHeader
          fixedHeaderScrollHeight="500px"
        ></DataTable>
      </div>
    );
  }
}

export default PersonasList;
