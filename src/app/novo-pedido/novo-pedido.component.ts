import { Component } from '@angular/core';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'novo-pedido',
  standalone: true,
  templateUrl: './novo-pedido.component.html',
})
export class NovoPedidoComponent {
  constructor(private pedidoService: PedidoService) {}

  iniciarPedido(): void {
    this.pedidoService.iniciarPedido().subscribe();
  }
}
