import { Component, Input } from '@angular/core';
import { PedidoService, Produto } from '../pedido.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'adicionar-produto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adicionar-produto.component.html',
})
export class AdicionarProdutoComponent {
  descricao: string = '';
  titulo: string = '';

  @Input() pedidoId = 0;

  constructor(private pedidoService: PedidoService) {}

  adicionarProduto(): void {
    this.pedidoService
      .adicionarProduto(this.pedidoId, this.descricao, this.titulo)
      .subscribe();
  }
}
