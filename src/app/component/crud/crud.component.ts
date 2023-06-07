import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from 'src/app/model/produto';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  // Variaveis

  produtos: Produto[] = [];
  produtoCriado: Produto = {
    id: 0,
    nomeProduto: '',
    precoProduto: 0,
    estoqueProduto: 0
  }


  constructor(
    private apiProduto: ProdutoService,
  ) { };

  ngOnInit(): void {
    this.apiProduto
    this.pegarProdutos();
  }

  pegarProdutos(): void {
    this.apiProduto.getTodosProdutos().subscribe((data) => {
      this.produtos = data
    })
  }

  validateProduto(): void {
    if (this.produtoCriado.nomeProduto.trim().length == 0) {
      alert('Produto inválido')
      return
    } else if (this.produtoCriado.precoProduto == 0) {
      alert('Produto inválido')
      return
    } else if (this.produtoCriado.estoqueProduto != Math.floor(this.produtoCriado.estoqueProduto)) {
      alert('Produto inválido')
      return
    } else if (this.produtoCriado.id == 0) {
      this.insereProduto();
    } else {
      this.editarProduto(this.produtoCriado)
    }
  }

  insereProduto(): void {
    this.apiProduto.insereNovoProduto(this.produtoCriado).subscribe((resp) => {
      alert('Produto Inserido')
      this.pegarProdutos();
    })
  }

  editarProduto(prod: Produto): void {
    this.apiProduto.putEditaProduto(prod).subscribe((data) => {
      this.pegarProdutos();
    })
  }

  selecionarEdicao(id: number): void {
    this.apiProduto.getProdutoPorId(id).subscribe((data) => {
      this.produtoCriado = data;
      this.pegarProdutos();
    })
  }

  deletProduto(id: number): void {
    this.apiProduto.deleteProduto(id).subscribe((data) => {
      alert('Produto Deletado')
      this.pegarProdutos();
    })
  }



}
