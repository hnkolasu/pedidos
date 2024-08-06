import { Component } from '@angular/core';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';
import { NovoPedidoComponent } from './novo-pedido/novo-pedido.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListarPedidosComponent, NovoPedidoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pedidos';
}
