import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/layouts/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/custom.css";
//Importaciones correspondientes a los componentes
import PersonasView from "./components/app/Personas/PersonasView";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={PersonasView} />
      </Layout>
    );
  }
}
