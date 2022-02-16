import React, { Component, Fragment } from "react";
import PacienteService from "../../Services/PacienteService";
import "./Pacientes.css";
import Swal from "sweetalert2";

export default class Pacientes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      citas: [],
    };

    this.addCita = this.addCita.bind(this);
    this.editCita = this.editCita.bind(this);
    this.deleteCita = this.deleteCita.bind(this);
  }

    //delete one citas
    deleteCita(id) {
        //Agregar el swetalert
        Swal.fire({
          title: "seguro eliminar cliente",
          text: "Este Accion no puede dehacer",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si eliminar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Eliminado',
            )
            //eliminado de la base de datos
            //rest api call
            PacienteService.deletePaciente(id).then((res) => {
              this.setState({
                citas: this.state.citas.filter(
                  (citas) => citas.id !== id
                ),
              });
            });
          }
        });
      }

  //get all citas
  componentDidMount() {
    PacienteService.getPacientes().then((res) => {
      this.setState({ citas: res.data });
    });
  }

   //edit one specific cita
   editCita(id) {
    this.props.history.push(`/add-cita/${id}`);
  }


  addCita() {

    this.props.history.push("/add-cita/_add");
  }



  render() {
    return (
      <Fragment>
     
          <h1 className="h1">Admin de Pacientes</h1>

          <button
            className="btn btn-primary mt-3 mb-2"
            onClick={this.addCita}
          >
            Agregar Cita
          </button>

          <div className="contenador-card">
            {this.state.citas.map((cita) => (
              <div
                key={cita.id}
                className="card"
                style={{ width: "18rem" }}
              >
                <div className="card-header bg-dark text-white"><span>Nombre :  </span>{ cita.nombre}</div>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><span>Propietario : </span>{cita.propietario}</li>
                  <li className="list-group-item"><span>Telefono : </span>{cita.telefono}</li>
                  <li className="list-group-item"><span>Fecha : </span>{cita.fecha}</li>
                  <li className="list-group-item"><span>Hora : </span>{cita.hora}</li>
                  <li className="list-group-item"><span>Sintomas : </span>{cita.sintomas}</li>
                </ul>

                <div className="card-footer bg-dark text-white">
                  <button
                    onClick={() => this.editCita(cita.id)}
                    className="btn btn-warning"
                    style={{ marginLeft: "10px" }}
                  >
                    Editar
                  </button>

                  <button
                   onClick={() => this.deleteCita(cita.id)}
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
      
      </Fragment>
    );
  }
}
