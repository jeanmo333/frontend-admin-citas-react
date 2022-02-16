import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Clientes from "./Components/Clientes/Clientes";
import Medicamentos from "./Components/Medicamentos/Medicamentos";
import Pacientes from "./Components/Pacientes/Pacientes";
import NuevaCita from "./Components/NuevoCita/NuevaCita";

function App() {
  //crear el state de la applicacion
  //const [pacientes, guardarPacientes] = useState([]);
  //const [consuta, guardarConsulta] = useState(true);

  return (
    <Router>
      <div className="App ">
        <Navbar />

        <Switch>
          <div className="container">
            <Route path="/" exact component={Home} />

            <Route
              path="/pacientes" exact component={Pacientes}/>
            <Route path="/clientes" exact component={Clientes} />
            <Route path="/medicamentos" exact component={Medicamentos} />

            <Route path="/add-cita/:id" exact component={NuevaCita} />
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
