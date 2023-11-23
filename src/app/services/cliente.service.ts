import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteDTO } from "../model/cliente-dto.model"
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get(`${this.baseUrl}/clientes`);
  }

  getCliente(sharedkey: string | string) {
    return this.http.get(`${this.baseUrl}/clientes/${sharedkey}`);
  }

  addCliente(cliente: ClienteDTO) {
    return this.http.post(`${this.baseUrl}/clientes`, cliente);
  }

  deleteCliente(cliente: ClienteDTO) {
    return this.http.delete(`${this.baseUrl}/clientes/${cliente.id}`);
  }

  updateCliente(cliente: ClienteDTO) {
    return this.http.put(`${this.baseUrl}//clientes/`, cliente);
  }
}
