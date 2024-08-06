import { TestBed } from '@angular/core/testing';
import { PedidoService, Pedido, Produto } from './pedido.service';

describe('PedidoService', () => {
  let service: PedidoService;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PedidoService] });
    service = TestBed.inject(PedidoService);
  });

  it('deveria ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deveria listar pedidos', (done) => {
    service.listarPedidos().subscribe((pedidos) => {
      expect(pedidos).toEqual([]);
      done();
    });
  });

  it('deveria criar novo pedido', (done) => {
    service.listarPedidos().subscribe((pedidos) => {
      expect(pedidos.length).toBe(0);

      service.iniciarPedido().subscribe(() => {});
      service.listarPedidos().subscribe((updatedPedidos) => {
        expect(updatedPedidos.length).toBe(1);
        expect(updatedPedidos[0].id).toBe(1);
        expect(updatedPedidos[0].produtos).toEqual([]);
        expect(updatedPedidos[0].fechado).toBe(false);
        done();
      });
    });
  });

  it('deveria adicionar um produto ao pedido', (done) => {
    const pedidoId = 1;
    const produto: Produto = {
      id: 1,
      titulo: 'Produto 1',
      descricao: 'Descrição 1',
    };
    service.iniciarPedido().subscribe(() => {});
    service
      .adicionarProduto(pedidoId, produto.descricao, produto.titulo)
      .subscribe(() => {});
    service.listarPedidos().subscribe((pedidos) => {
      const pedido = pedidos.find((p) => p.id === pedidoId);
      expect(pedido?.produtos.length).toBe(1);
      expect(pedido?.produtos[0].titulo).toBe(produto.titulo);
      expect(pedido?.produtos[0].descricao).toBe(produto.descricao);
      done();
    });
  });

  it('não deveria adicionar mais um produto ao pedido caso ele esteja fechado', (done) => {
    const pedidoId = 1;
    const produto: Produto = {
      id: 1,
      titulo: 'Produto 1',
      descricao: 'Descrição 1',
    };
    service.iniciarPedido().subscribe(() => {});
    service
      .adicionarProduto(pedidoId, produto.descricao, produto.titulo)
      .subscribe(() => {});

    service.fecharPedido(pedidoId).subscribe(() => {});
    service
      .adicionarProduto(pedidoId, produto.descricao, produto.titulo)
      .subscribe(() => {});
    service.listarPedidos().subscribe((pedidos) => {
      const pedido = pedidos.find((p) => p.id === pedidoId);
      expect(pedido?.produtos.length).toBe(1);
      done();
    });
  });

  it('não deveria adicionar um produto ao pedido se a descrição do produto for maior que 50', (done) => {
    const pedidoId = 1;
    const produto: Produto = {
      id: 1,
      titulo: 'Produto 1',
      descricao:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra rhoncus pulvinar. Nunc dignissim et', // >50 char
    };
    service.iniciarPedido().subscribe(() => {});

    service
      .adicionarProduto(pedidoId, produto.descricao, produto.titulo)
      .subscribe(() => {});
    service.listarPedidos().subscribe((pedidos) => {
      const pedido = pedidos.find((p) => p.id === pedidoId);
      expect(pedido?.produtos.length).toBe(0);
      done();
    });
  });

  it('deveria remover um produto de um pedido', (done) => {
    const pedidoId = 1;
    let produtoId = 0;
    service.iniciarPedido().subscribe(() => {});
    service
      .adicionarProduto(pedidoId, 'Produto 1', 'Descrição 1')
      .subscribe(() => {});
    service.listarPedidos().subscribe((pedidos) => {
      produtoId = pedidos[0].produtos[0].id;
    });

    service.removerProduto(pedidoId, produtoId).subscribe(() => {});
    service.listarPedidos().subscribe((updatedPedidos) => {
      const pedido = updatedPedidos.find((p) => p.id === pedidoId);
      expect(pedido?.produtos.length).toBe(0);
      done();
    });
  });

  it('não deveria remover um produto de um pedido se o pedido estiver fechado', (done) => {
    const pedidoId = 1;
    let produto!: Produto;
    service.iniciarPedido().subscribe(() => {});
    service
      .adicionarProduto(pedidoId, 'Produto 1', 'Descrição 1')
      .subscribe(() => {});
    service.listarPedidos().subscribe((pedidos) => {
      produto = pedidos[0].produtos[0];
    });
    service.fecharPedido(pedidoId).subscribe(() => {});
    service.removerProduto(pedidoId, produto.id).subscribe(() => {});
    service.listarPedidos().subscribe((updatedPedidos) => {
      const pedido = updatedPedidos.find((p) => p.id === pedidoId);
      expect(pedido?.produtos.length).toBe(1);
      expect(pedido?.produtos[0].titulo).toBe(produto.titulo);
      expect(pedido?.produtos[0].descricao).toBe(produto.descricao);
      done();
    });
  });

  it('não deveria fechar um pedido se o pedido nao tiver ao menos um produto', (done) => {
    const pedidoId = 1;
    service.iniciarPedido().subscribe(() => {});
    service.fecharPedido(pedidoId).subscribe(() => {});
    service.listarPedidos().subscribe((pedidos) => {
      const pedido = pedidos.find((p) => p.id === pedidoId);
      expect(pedido?.fechado).toBe(false);
      done();
    });
  });

  it('deveria fechar um pedido', (done) => {
    const pedidoId = 1;
    service.iniciarPedido().subscribe(() => {});

    const produto: Produto = {
      id: 1,
      titulo: 'Produto 1',
      descricao: 'Descrição 1',
    };
    service
      .adicionarProduto(pedidoId, produto.descricao, produto.titulo)
      .subscribe(() => {});
    service.fecharPedido(pedidoId).subscribe(() => {});
    service.listarPedidos().subscribe((pedidos) => {
      const pedido = pedidos.find((p) => p.id === pedidoId);
      expect(pedido?.fechado).toBe(true);
      done();
    });
  });
});
