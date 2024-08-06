import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoPedidoComponent } from './novo-pedido.component';

describe('NovoPedidoComponent', () => {
  let component: NovoPedidoComponent;
  let fixture: ComponentFixture<NovoPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NovoPedidoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NovoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
