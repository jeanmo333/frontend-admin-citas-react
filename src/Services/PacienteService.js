import axios from "axios";

const url = "http://localhost:8080/api/pacientes";

class PacienteService {
  getPacientes() {
    return axios.get(url);
  }

  createPaciente(cita) {
      return axios.post(url, cita)
  }

  getPacienteById(citaId) {
    return axios.get(url+ '/' + citaId)
  }

  updatePaciente(cita, citaId) {
    return axios.put(url + '/' + citaId, cita)
  }

  deletePaciente(citaId) {
    return axios.delete(url + '/' + citaId);
  }
  
}

export default new PacienteService();