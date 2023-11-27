import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteDTO } from 'src/app/model/cliente-dto.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public clientes: ClienteDTO[] = [
    new ClienteDTO("", "", "", 0, "", "", "", 0)
  ];

  public isShowDiv = false;
  public search: string = "";
  public clienteModel: ClienteDTO = new ClienteDTO("", "", "", 0, "", "", "", 0);

  constructor(private clienteServices: ClienteService, private dialogo: MatDialog, private snackBar: MatSnackBar) { }

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }

  agregarCliente() {
    this.dialogo
      .open(AgregarClienteComponent, {
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (!confirmado) {
          this.snackBar.open('No se inserto cliente', undefined, {
            duration: 1500,
          });
        } else {
          this.obtenerClientes();
        }
      });
  }

  editarCliente(cliente: ClienteDTO) {
    this.dialogo
      .open(EditarClienteComponent, {
        data: cliente
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (!confirmado) {
          this.snackBar.open('No se edito cliente', undefined, {
            duration: 1500,
          });
        } else {
          this.obtenerClientes();
        }
      });
  }

  eliminarCliente(cliente: ClienteDTO) {
    this.dialogo
      .open(DialogConfirmComponent, {
        data: `¿Realmente quieres eliminar a ${cliente.bussinessId}?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (!confirmado) return;
        this.clienteServices
          .deleteCliente(cliente)
          .subscribe(() => {
            this.obtenerClientes();
            this.snackBar.open('Cliente eliminado', undefined, {
              duration: 1500,
            });
          });
      })
  }

  buscarClienteBySharedKey() {
    if (this.search.length > 0) {
      this.clienteServices
        .getClienteBySharedKey(this.search)
        .subscribe((clientes: any) => {
          this.clientes = clientes;
        });
    } else {
      this.obtenerClientes();
    }
  }

  buscarClienteByAdvanceSearch() {
    if (this.clienteModel['bussinessId'].length > 0 ||
      this.clienteModel['email'].length > 0 ||
      this.clienteModel['phone'] > 0 ||
      this.clienteModel['startDate'].length > 0 ||
      this.clienteModel['endDate'].length > 0) {
      this.clienteServices
        .postClientesByAdvanceSearch(this.clienteModel)
        .subscribe((clientes: any) => {
          this.clientes = clientes;
        });
    } else {
      this.obtenerClientes();
    }
  }
  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes() {
    return this.clienteServices
      .getClientes()
      .subscribe((clientes: any) => this.clientes = clientes);
  }


  generateUserCSV() {
    this.clienteServices.getClientes().subscribe((clientesData) => { this.downloadFile(clientesData, 'ExportClientes') })
  }


  downloadFile(data: any, filename = 'data') {
    let csvData = this.ConvertToCSV(data, ['id', 'sharedKey', 'bussinessId', 'email', 'phone', 'startDate', 'endDate', 'creationDate']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: any, headerList: string[]) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    console.log(objArray);
    console.log(array);
    let str = '';
    let row = 'Index,';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + this.strRep(array[i][head]);
      }
      str += line + '\r\n';
    }
    return str;
  }

  strRep(data: any) {
    if (typeof data == "string") {
      let newData = data.replace(/,/g, " ");
      return newData;
    }
    else if (typeof data == "undefined") {
      return "-";
    }
    else if (typeof data == "number") {
      return data.toString();
    }
    else {
      return data;
    }
  }

}
