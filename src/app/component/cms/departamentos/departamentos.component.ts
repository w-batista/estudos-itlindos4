import { Departamento } from './../../../model/departamento';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Coluna } from 'src/app/model/colunas';
import { CmsService } from 'src/app/service/cms.service';


@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {


   open = false
   isEdit = false
   departamentos: Departamento[] = []

   editDepartamento: Departamento = new Departamento();

   formDepto: FormGroup

   cols: Coluna[] = [
    {
      descricao: 'ID',
      nome: 'id',
      tipo: 'texto'
    },
    {
      descricao: 'DEPARTAMENTO',
      nome: 'departamento',
      tipo: 'texto'
    },
   ]


   constructor(
    private apiCms: CmsService ){

      this.formDepto = new FormGroup({
        departament: new FormControl('', [Validators.required, Validators.minLength(5)])
      })

    }

    ngOnInit(): void {
      this.getDepartamentos()
    }
    getDepartamentos(): void{
      this.apiCms.getAllDepartamentos().subscribe({
        next: (resposta) => {
          this.departamentos = resposta

        }, error: (erro) => {

        }
      })
    }

    onDeleteDep(evento: number){
      console.log('Excluí o departamento:', evento)
      this.apiCms.deleteDepartamento(evento).subscribe((data) => {
        alert('Produto Deletado')
        this.getDepartamentos();
      })
    }

    onEditDep(evento: Departamento){
      console.log('Editei o departamento:', evento)

      this.formDepto.get('departament')?.patchValue(evento.departamento)

      this.editDepartamento = evento
      this.isEdit = true
      this.openModal();
    }

    editaDepartamento(){
      this.editDepartamento.departamento = this.formDepto.get('departament')?.value;

      this.apiCms.putEditarDep(this.editDepartamento).subscribe((info)=> {
        this.closeModal()
        this.getDepartamentos();
        //window.location.href = "http://localhost:4200/departamentos"
      })
    }

    criarDepto(){
      this.formDepto.get('departament')?.reset()
      this.editDepartamento = new Departamento()
      this.isEdit = false
      this.openModal()
    }

    salvarDepartamento(){
      if(this.formDepto.get('departament')?.valid){
        this.editDepartamento.id = 0
        this.editDepartamento.departamento = this.formDepto.get('departament')?.value

        this.apiCms.insereNovoDep(this.editDepartamento).subscribe({
          next: () => {
            this.closeModal()
            this.getDepartamentos();
          },
          error: (error) => console.error(error)
        })
      }
      else{
        return;
      }
    }

    openModal(){
      this.open = true
    }
    closeModal(){
      this.open = false
    }
}
