import { Component, Input } from '@angular/core';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'remover-produto',
  standalone: true,
  imports: [],
  templateUrl: './remover-produto.component.html',
})
export class RemoverProdutoComponent {
  pedidoId: number = 0;
  produtoId: number = 0;

  @Input() idPedido = 0;
  @Input() idProduto = 0;

  constructor(private pedidoService: PedidoService) {}

  removerProduto(): void {
    this.pedidoService
      .removerProduto(this.idPedido, this.idProduto)
      .subscribe();
  }
}
