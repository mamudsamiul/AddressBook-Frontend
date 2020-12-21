import config from "../config/config";
import AxiosService from "../services/axios-service.js";
export default class AddressbookService {
  baseUrl = config.baseUrl;
  tokenRequired = false;
  httpOptions = null;

  addPerson(data) {
    return AxiosService.postService(`${this.baseUrl}add`, data);
  }
  updatePerson(data) {
    return AxiosService.putService(`${this.baseUrl}update`, data);
  }
  getAddressbook() {
    return AxiosService.getService(`${this.baseUrl}addressbooks`);
  }
  getPerson(id) {
    return AxiosService.getService(`${this.baseUrl}addressbook/${id}`);
  }
  deletePerson(id) {
    return AxiosService.deleteService(`${this.baseUrl}delete/${id}`);
  }
}