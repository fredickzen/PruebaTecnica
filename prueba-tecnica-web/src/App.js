import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Persona from './components/Persona';
import Usuario from './components/Usuario';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <div className="btn-group">
          <Link to="/" className="btn btn-dark" >
            Listado
          </Link>
        </div>
      
        <hr/>
        <Switch>
            <Route path="/persona/:id">
              <Usuario/>
            </Route>
            <Route path="/">
               <Persona/>
            </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
