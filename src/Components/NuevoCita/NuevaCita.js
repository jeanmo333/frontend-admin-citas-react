import React, { Component } from "react";
import PacienteService from "../../Services/PacienteService";
import Swal from "sweetalert2";
import './NuevaCita.css';

export default class NuevaCita extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nombre: "",
      propietario: "",
      telefono: "",
      fecha: "",
      hora: "",
      sintomas: "",
    };
    this.changeNombreHandler = this.changeNombreHandler.bind(this);
    this.changePropietarioHandler = this.changePropietarioHandler.bind(this);
    this.changeTelefonoHandler = this.changeTelefonoHandler.bind(this);
    this.changeFechaHandler = this.changeFechaHandler.bind(this);
    this.changeHoraHandler = this.changeHoraHandler.bind(this);
    this.changeSintomasHandler = this.changeSintomasHandler.bind(this);
    this.saveOrUpdateCita = this.saveOrUpdateCita.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      PacienteService.getPacienteById(this.state.id).then((res) => {
        let cita = res.data;
        this.setState({
          nombre: cita.nombre,
          propietario: cita.propietario,
          telefono: cita.telefono,
          fecha: cita.fecha,
          hora: cita.hora,
          sintomas: cita.sintomas,
        });
      });
    }
  }

  saveOrUpdateCita = (e) => {
    e.preventDefault();

    let cita = {
      nombre: this.state.nombre,
      propietario: this.state.propietario,
      telefono: this.state.telefono,
      fecha: this.state.fecha,
      hora: this.state.hora,
      sintomas: this.state.sintomas,
    };

    if (this.state.id === "_add") {
      PacienteService.createPaciente(cita).then(() => {
        //the swetalert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "agregado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        //redirigir a la pagina customer
        this.props.history.push("/pacientes");
      });
    } else {
      PacienteService.updatePaciente(cita, this.state.id).then((res) => {
        //the swetalert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "modificado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        //redirigir a la pagina customer
        this.props.history.push("/pacientes");
      });
    }
  };

  changeNombreHandler(e) {
    this.setState({ nombre: e.target.value });
  }

  changePropietarioHandler(e) {
    this.setState({ propietario: e.target.value });
  }

  changeTelefonoHandler(e) {
    this.setState({ telefono: e.target.value });
  }

  changeFechaHandler(e) {
    this.setState({ fecha: e.target.value });
  }

  changeHoraHandler(e) {
    this.setState({ hora: e.target.value });
  }

  changeSintomasHandler(e) {
    this.setState({ sintomas: e.target.value });
  }

  cancel() {
    this.props.history.push("/pacientes");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Agregar paciente</h3>;
    } else {
      return <h3 className="text-center">Editar paciente</h3>;
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row mt-5">
            <div className=" card mt-5">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      value={this.state.nombre}
                      onChange={this.changeNombreHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ marginTop: "10px" }}>Propietario</label>
                    <input
                      type="text"
                      name="propietario"
                      className="form-control"
                      value={this.state.propietario}
                      onChange={this.changePropietarioHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ marginTop: "10px" }}>Telefono</label>
                    <input
                      type="tel"
                      name="telefno"
                      className="form-control"
                      value={this.state.telefono}
                      onChange={this.changeTelefonoHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ marginTop: "10px" }}>Fecha</label>
                    <input
                      type="date"
                      name="fecha"
                      className="form-control"
                      value={this.state.fecha}
                      onChange={this.changeFechaHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ marginTop: "10px" }}>Hora</label>
                    <input
                      type="time"
                      name="hora"
                      className="form-control"
                      value={this.state.hora}
                      onChange={this.changeHoraHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{marginTop: "10px"}}>Sintomas</label>
                    <input
                      type="text"
                      name="sintomas"
                      className="form-control"
                      value={this.state.sintomas}
                      onChange={this.changeSintomasHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateCita}
                    style={{ marginTop: "10px" }}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                  >
                    Volver
                  </button>
        
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
