import { Component, OnInit } from '@angular/core';
import { PedidoService, Pedido } from '../pedido.service';
import { CommonModule } from '@angular/common';
import { PedidoComponent } from '../pedido/pedido.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'listar-pedidos',
  standalone: true,
  imports: [CommonModule, PedidoComponent, FormsModule],
  templateUrl: './listar-pedidos.component.html',
})
export class ListarPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  public filtro = 'todos';

  get pedidosFiltrados(): Pedido[] {
    if (this.filtro === 'todos') {
      return this.pedidos;
    }
    const fechado = this.filtro === 'true';
    return this.pedidos.filter((pedido) => pedido.fechado === fechado);
  }

  ngOnInit(): void {
    this.pedidoService.listarPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }
}
