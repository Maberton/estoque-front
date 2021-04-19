import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Estoque } from '../models/estoque.model';
import { Produto } from '../models/produto.model';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditarEstoqueComponent } from '../dialogs/editar-estoque/editar-estoque.component';
import { RetornoEstoque } from '../models/retornoEstoque.model';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger) _auto: MatAutocompleteTrigger;
  @ViewChild(MatSort) sort: MatSort;

  codBarras = new FormControl();
  nome = new FormControl();
  quantidade = new FormControl();
  custo = new FormControl();
  valorVenda = new FormControl();
  dataValidade = new FormControl();
  displayedColumns: string[] = ['quantidade', 'nome', 'dataValidade', 'codBarras', 'custo', 'valorVendaSugerido', 'lucroReais', 'lucroPercentual', 'acoes'];
  produtosFiltrados: Observable<Object[]>;
  retornoProdutosApi: Array<Produto>;
  retornoEstoqueApi = new Array<Estoque>();
  produtoSelecionado: Produto;
  dados = new MatTableDataSource(this.retornoEstoqueApi);
  nomeProduto: string;
  totalEmProdutos: number;
  lucroTotal: number;

  mascara = {
    guide: true,
    showMask : false,
    mask: [/\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
  };

  constructor(
    private api: ApiService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarProdutos();
    this.listarEstoque();
  }

  ngAfterViewInit() {
    this.dados.sort = this.sort;
  }

  private listarProdutos(): void {
    this.api.listarProdutos()
    .subscribe( (retorno: Array<Produto>) => {
      this.retornoProdutosApi = retorno;
      this.filtroProdutos();
    });
  }

  private listarEstoque(): void {
    this.api.listarEstoque()
    .subscribe((retorno: RetornoEstoque) => {
      this.retornoEstoqueApi = retorno.dados;
      this.totalEmProdutos = retorno.soma.custo;
      this.lucroTotal = retorno.soma.lucro;
      this.dados.data = this.retornoEstoqueApi;
      this.filtroProdutos();
    });
  }

  private limparCadastro(): void {
    this.codBarras.setValue(null);
    this.nome.setValue(null);
    this.quantidade.setValue(null);
    this.custo.setValue(null);
    this.valorVenda.setValue(null);
    this.dataValidade.setValue(null);
  }

  private filtroProdutos(): void {
    this.produtosFiltrados = this.nome.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.nome),
      map(nome => this._filtrar(nome))
    );
  }

  private _filtrar(nome:  string): Object[] {
    const filterValue = nome.toLowerCase();

    return this.retornoProdutosApi.filter(produto => produto.nome.toLowerCase().indexOf(filterValue) === 0);
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dados.filter = filterValue.trim().toLowerCase();
  }

  gravarEstoque(evento): void {

    const entradaEstoque = new Estoque();

    entradaEstoque.nomeProduto = this.nomeProduto;
    entradaEstoque.quantidade = this.quantidade.value;
    if (this.codBarras.value) {
      entradaEstoque.codBarras = this.codBarras.value;
    }
    if (this.custo.value) {
      entradaEstoque.custo = this.custo.value;
    }
    if (this.valorVenda.value) {
      entradaEstoque.valorVendaSugerido = this.valorVenda.value;
    }
    if (this.dataValidade.value) {
      entradaEstoque.dataValidade = this.dataValidade.value;
    }

    this.api.gravarEstoque(entradaEstoque)
    .subscribe(() => {
      this._snackBar.open('Registro cadastrado com sucesso', 'fechar', {
        duration: 2000,
      });
      this.listarProdutos();
      this.listarEstoque();
      this.limparCadastro();
    });
  }


  verificaNome(nomeProduto: string): void {

    if (this.retornoProdutosApi && this.retornoProdutosApi.length) {

      const produtoSelecionado = this.retornoProdutosApi.find(produto => produto.nome === nomeProduto);

      if (produtoSelecionado && produtoSelecionado.codBarras) {
        this.codBarras.setValue(produtoSelecionado.codBarras);
      }
    }
    this.nomeProduto = nomeProduto;

  }

  verificaCodBarras(codBarras: string): void {
    if (this.retornoProdutosApi && this.retornoProdutosApi.length) {
      const produtoSelecionado = this.retornoProdutosApi.find(produto => produto.codBarras === codBarras);

      if (produtoSelecionado && produtoSelecionado.nome) {
        this.nome.setValue(produtoSelecionado.nome);
      }
    }
  }

  obtemDescricaoProduto(produto: Produto) {
    return produto && produto.nome ? produto.nome : '';
  }

  editarEstoque(linhaEstoque: Estoque): void {
    const dado = linhaEstoque;
    const modal = this.dialog.open(EditarEstoqueComponent, {
      data: dado
    });

    modal.afterClosed()
    .subscribe((resultado: Estoque) => {

      const entradaAtualizacao = new Estoque();

      entradaAtualizacao.id = resultado.id;
      entradaAtualizacao.idProduto = resultado.idProduto;

      if ( resultado.codBarras ) {
        entradaAtualizacao.codBarras = resultado.codBarras;
      }

      if ( resultado.quantidade ) {
        entradaAtualizacao.quantidade = resultado.quantidade;
      }

      if ( resultado.custo ) {
        console.log('resultado.custo', resultado.custo);
        entradaAtualizacao.custo = resultado.custo;
      }

      if ( resultado.valorVendaSugerido ) {
        entradaAtualizacao.valorVendaSugerido = resultado.valorVendaSugerido;
      }

      if ( resultado.dataValidade ) {
        entradaAtualizacao.dataValidade = resultado.dataValidade;
      }

      console.log('resultado', resultado);
      // const entradaAtualizacaoEstoque = resultado;
      this.api.atualizaEstoque(entradaAtualizacao)
      .subscribe(() => {
        this.listarEstoque();
      })
    })

  }

}
