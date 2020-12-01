import axios from 'axios';


const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4000/",
  headers: {
    Accept: 'application/json'
  }
});

export const mainRequestProcesses = {
  getProcesses() {
    return instance.get(`processes/`);
  },
  addProcess() {
    // debugger
    return instance.post(`processes/process/`)
  },
  removeProcess(id: string) {
    return instance.delete(`processes/process/` + id);
  },
}

export const mainRequestJobs = {
  getJobs() {
    return instance.get(`jobs/`);
  },
  // addJobs(processId: string) {
  //   return instance.post(`jobs/job/` + processId)
  // },
  // removeJobs(processId: string) {
  //   return instance.post(`jobs/job/` + processId);
  // },
}
