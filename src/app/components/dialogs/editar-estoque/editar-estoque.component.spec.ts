import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstoqueComponent } from './editar-estoque.component';

describe('EditarEstoqueComponent', () => {
  let component: EditarEstoqueComponent;
  let fixture: ComponentFixture<EditarEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEstoqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
