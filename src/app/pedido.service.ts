import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Produto {
  id: number;
  titulo: string;
  descricao: string;
}

export interface Pedido {
  id: number;
  produtos: Produto[];
  fechado: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private pedidos: Pedido[] = [];
  private idPedido = 1;
  private idProduto = 1;

  constructor() {}

  listarPedidos(): Observable<Pedido[]> {
    return of(this.pedidos);
  }

  iniciarPedido(): Observable<Pedido> {
    const novoPedido: Pedido = {
      id: this.idPedido++,
      produtos: [],
      fechado: false,
    };
    this.pedidos.push(novoPedido);
    return of(novoPedido);
  }

  adicionarProduto(
    pedidoId: number,
    descricao: string,
    titulo: string
  ): Observable<void> {
    const novoProduto: Produto = {
      id: this.idProduto++,
      descricao: descricao,
      titulo: titulo,
    };

    const pedido = this.pedidos.find((p) => p.id == pedidoId);
    if (pedido && !pedido.fechado && novoProduto.descricao.length <= 50) {
      pedido.produtos.push(novoProduto);
    }
    return of();
  }

  removerProduto(pedidoId: number, produtoId: number): Observable<void> {
    const pedido = this.pedidos.find((p) => p.id == pedidoId);
    if (pedido && !pedido.fechado) {
      pedido.produtos = pedido.produtos.filter((p) => p.id != produtoId);
    }
    return of();
  }

  fecharPedido(pedidoId: number): Observable<void> {
    console.log(pedidoId);
    const pedido = this.pedidos.find((p) => p.id == pedidoId);
    if (pedido && pedido.produtos.length > 0) {
      pedido.fechado = true;
    }
    return of();
  }
}
