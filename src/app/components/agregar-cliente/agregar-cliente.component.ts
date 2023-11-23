import { Component, OnInit } from '@angular/core';
import { ClienteDTO } from 'src/app/model/cliente-dto.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  clienteModel = new ClienteDTO(0, "", "", "", 0, "", "", "");

  constructor(private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.clienteService.addCliente(this.clienteModel).subscribe(() => {
      this.snackBar.open('Cliente agregado', undefined, {
        duration: 1500,
      });
      this.router.navigate(['/clientes']);
    })
  }
}
