import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estoque } from '../../models/estoque.model';

@Component({
  selector: 'app-editar-estoque',
  templateUrl: './editar-estoque.component.html',
  styleUrls: ['./editar-estoque.component.scss']
})
export class EditarEstoqueComponent implements OnInit {

  codBarras = new FormControl();
  quantidade = new FormControl();
  custo = new FormControl();
  valorVendaSugerido: number;
  dataValidade = new FormControl();
  dadosEditados = new Estoque();

  mascara = {
    guide: true,
    showMask : false,
    mask: [/\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
  };

  mascaraValor = { prefix: 'R$ ', thousands: '.', decimal: ',' };

  constructor(
    public dialogRef: MatDialogRef<EditarEstoqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estoque
    ) {}

  ngOnInit(): void {
    this.dadosEditados = {...this.data};
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
