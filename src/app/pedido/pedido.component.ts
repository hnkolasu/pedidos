import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdicionarProdutoComponent } from '../adicionar-produto/adicionar-produto.component';
import { Pedido, PedidoService, Produto } from '../pedido.service';
import { ProdutoComponent } from '../produto/produto.component';

@Component({
  selector: 'pedido',
  standalone: true,
  imports: [CommonModule, AdicionarProdutoComponent, ProdutoComponent],
  templateUrl: './pedido.component.html',
})
export class PedidoComponent {
  constructor(private pedidoService: PedidoService) {}

  @Input() pedido!: Pedido;

  adicionandoProduto = false;

  fecharPedido(): void {
    this.pedidoService.fecharPedido(this.pedido.id).subscribe();
  }

  toggleAdicionarProduto() {
    this.adicionandoProduto = !this.adicionandoProduto;
  }
}
