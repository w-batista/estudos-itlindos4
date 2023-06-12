import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  editProduto: Produtos = new Produtos()

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
  formProd: FormGroup

  open = false
  isEdit = false

constructor (private apiUrl: CmsService) {
  this.formProd = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
    preco: new FormControl('', [Validators.required, Validators.minLength(2)]),
    estoque: new FormControl('', [Validators.required, Validators.minLength(1)]),
    depto: new FormControl('', [Validators.required, Validators.minLength(5)]),
    descricao: new FormControl('', [Validators.required, Validators.minLength(20)]),
    imagem: new FormControl('', [Validators.required]),
  })
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
      this.apiUrl.deleteProduto(evento).subscribe((data) => {
        alert('Produto Deletado')
        this.getProduto();
      })
  }
  onEditProd(evento: Produtos) {
    console.log('Editar o produto:', evento)
    this.formProd.get('id')?.patchValue(evento.id)
    this.formProd.get('nome')?.patchValue(evento.nome)
    this.formProd.get('preco')?.patchValue(evento.preco)
    this.formProd.get('estoque')?.patchValue(evento.estoque)
    this.formProd.get('depto')?.patchValue(evento.departamento)
    this.formProd.get('descricao')?.patchValue(evento.descricao)
    this.formProd.get('imagem')?.patchValue(evento.imagem)
    this.openModal()
    this.isEdit = true
  }

  salvarProd(): void{
    let produto: Produtos = {
      id: this.formProd.value.id,
      nome: this.formProd.value.nome,
      preco: this.formProd.value.preco,
      estoque: this.formProd.value.estoque,
      departamento: this.formProd.value.departamento,
      descricao: this.formProd.value.descricao,
      imagem: this.formProd.value.imagem
    }
    if(!this.isEdit){
      this.apiUrl.insereNovoProduto(produto).subscribe((data) => {
        alert (`Produto: ${produto.nome}, inserido!`)
        this.atualizar()
      })
    }
    else {
      this.apiUrl.putEditaProduto(produto).subscribe((data) => {
        alert (`Produto: ${produto.nome}, alterado!`)
        this.atualizar()
      })
    }
  }
  atualizar(){
    this.getProduto()
    this.closeModal()
    this.formProd.reset()
  }

  novoProduto(){
    this.formProd.reset()
    this.editProduto = new Produtos()
    this.isEdit = false
    this.openModal()
  }

  openModal(){
    this.open = true
  }
  closeModal(){
    this.open = false
  }
}
