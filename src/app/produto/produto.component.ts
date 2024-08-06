import { Component, Input } from '@angular/core';
import { Pedido, PedidoService, Produto } from '../pedido.service';
import { RemoverProdutoComponent } from '../remover-produto/remover-produto.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'produto',
  standalone: true,
  imports: [RemoverProdutoComponent, CommonModule],
  templateUrl: './produto.component.html',
})
export class ProdutoComponent {
  @Input() produto!: Produto;
  @Input() pedido!: Pedido;

  constructor(private pedidoService: PedidoService) {}

  removerProduto(): void {
    this.pedidoService
      .removerProduto(this.pedido.id, this.produto.id)
      .subscribe();
  }
}
