import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Departamento } from 'src/app/model/departamento';
import { Produtos } from 'src/app/model/produtos';
import { CmsService } from 'src/app/service/cms.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coluna } from 'src/app/model/colunas';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {

// INPUT utilizado para compartilhar informações entre às páginas

  @Input() dados: Produtos[] | Departamento[] = []
  @Input() cols: Coluna[] = [];

  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>()

  @Output() onEdit: EventEmitter<Departamento | Produtos> = new EventEmitter<Departamento | Produtos>()

  //@Input() itens: Departamento[] = []
  open = false
  produ: Produtos [] = []
  dep: Departamento[] = []

  depto: Departamento = {
    id: 0,
    departamento: ''
  }
  pro: Produtos = {
     nome: '',
     preco: 0,
     estoque: 0,
     departamento: 0,
     descricao: '',
     imagem: '',
     id: 0
  }
  formPost: FormGroup
  formDepto: FormGroup
  constructor(
    private apiUrl: CmsService,
    public rotaAtiva: Router
    ){
      this.formDepto = new FormGroup({
        departament: new FormControl('', [Validators.required, Validators.minLength(5)])
      })
      this.formPost = new FormGroup({
        nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
        preco: new FormControl('', [Validators.required, Validators.minLength(2)]),
        estoque: new FormControl('', [Validators.required, Validators.minLength(1)]),
        depto: new FormControl('', [Validators.required, Validators.minLength(5)]),
        descricao: new FormControl('', [Validators.required, Validators.minLength(20)]),
      })
    }

    ngOnInit(){
      this.getDepto()
      console.log('colunas', this.cols)

      setTimeout(() => {
        console.log('itens', this.dados)
      }, 2000);
    }
    openModal(){
      this.open = true
    }
    closeModal(){
      this.open = false
    }

    criarPost(): void{
      let enviarPost: Produtos = {
        id: this.formPost.value.id,
        nome: this.formPost.value.nome,
        preco: this.formPost.value.preco,
        estoque: this.formPost.value.estoque,
        departamento: this.formPost.value.departamento,
        descricao: this.formPost.value.descricao,
        imagem: this.formPost.value.imagem
      }
      let novoPost = this.apiUrl
      this.apiUrl.insereNovoProduto(enviarPost).subscribe((data) => {
        alert ('Produto inserido')
      })
    }

  getProduto(): void {
    this.apiUrl.getAllProduto().subscribe((data) => {
      this.produ = data
    })
  }
  getDepto(): void {
    this.apiUrl.getAllDepartamentos().subscribe((data) => {
      this.dep = data
      console.log('itens', this.dep)
    })
  }

  deletDep(id: number): void {
    if(id){
      this.onDelete.emit(id);
    }
  }
  editDep(depto: Departamento){
    if(depto){
      this.onEdit.emit(depto)
    }
  }

  deletProd(id: number): void {
    if(id){
      this.onDelete.emit(id);
    }
  }
  editaProd(prod: Produtos){
    this.apiUrl.putEditaProduto(prod).subscribe((info)=> {
      this.pro = info
      this.getProduto()
      this.closeModal()
      window.location.href = "http://localhost:4200/produtos"
    })
  }

  getValue(nome: string, row: any) : any {
    return row[nome]
  }
}
