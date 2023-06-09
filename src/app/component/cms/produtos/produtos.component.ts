import { Component } from '@angular/core';
import { Coluna } from 'src/app/model/colunas';
import { Produto } from 'src/app/model/produto';
import { Produtos } from 'src/app/model/produtos';
import { CmsService } from 'src/app/service/cms.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent {

  produtos: Produtos [] = []

  cols: Coluna[] = [
    {
      descricao: 'ID',
      nome: 'id',
      tipo: 'texto'
    },
    {
      descricao: 'NOME',
      nome: 'nome',
      tipo: 'texto'
    },
    {
      descricao: 'PREÇO',
      nome: 'preco',
      tipo: 'texto'
    },
    {
      descricao: 'ESTOQUE',
      nome: 'estoque',
      tipo: 'texto'
    },
    {
      descricao: 'DEPARTAMENTO',
      nome: 'departamento',
      tipo: 'texto'
    },
    {
      descricao: 'DESCRIÇÃO',
      nome: 'descricao',
      tipo: 'texto'
    },
    {
      descricao: 'IMAGEM',
      nome: 'imagem',
      tipo: 'imagem'
    }
   ]

constructor (private apiUrl: CmsService) {

}
ngOnInit(){
  this.getProduto()
}
  getProduto(): void {
    this.apiUrl.getAllProduto().subscribe({
      next: (data) => {
      this.produtos = data
    },
     error: (e) => {
      console.error(e)
     }
    })
  }

  onDeleteProd(evento: number){
    console.log('Excluí o produto:', evento)
      this.apiUrl.deleteDepartamento(evento).subscribe((data) => {
        alert('Produto Deletado')
        this.getProduto();
      })
  }
  onEditProd(evento: Produto) {
    console.log('Editar o produto:', evento)
  }
}
