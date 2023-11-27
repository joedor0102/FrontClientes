import { Component, OnInit, Inject } from '@angular/core';
import { ClienteDTO } from 'src/app/model/cliente-dto.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {


  clienteModel = new ClienteDTO("", "", "", 0, "", "", "", 0);

  constructor(private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    public dialogo: MatDialogRef<EditarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public idCliente: ClienteDTO
  ) { }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }
  ngOnInit(): void {
    this.clienteService.getClienteById(this.idCliente).subscribe(
      (cliente: any) => this.clienteModel = cliente
    );
  }

  onSubmit() {
    this.clienteService.updateCliente(this.clienteModel).subscribe(() => {
      this.snackBar.open('Cliente actualizado', undefined, {
        duration: 1500,
      });
      this.confirmado();
    });
  }
}
