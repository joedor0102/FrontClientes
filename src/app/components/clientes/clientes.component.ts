import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteDTO } from 'src/app/model/cliente-dto.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public clientes: ClienteDTO[]=[
    new ClienteDTO(0, "sss", "sss", "sss", 0, "sss", "ssss", "ssss")
  ];

  constructor(private clienteServices: ClienteService, private dialogo: MatDialog, private snackBar: MatSnackBar) { }

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

  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes() {
    return this.clienteServices
      .getClientes()
      .subscribe((clientes: any) => this.clientes = clientes);
  }
 
}
