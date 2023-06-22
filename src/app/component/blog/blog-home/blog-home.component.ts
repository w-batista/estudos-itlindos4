import { Component, OnInit } from '@angular/core';
import { Usuarios } from './../model/usuarios';
import { Blog } from '../model/blog';
import { BlogService } from '../service/blog.service';


@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {

  pessoa= {
    nome: 'will batista',
    dataNasc: new Date('1987-10-01'),
    cpf: '33333333333'
  }

  blog: Blog[] = [];

  usuarios: Usuarios[] = [];

  usuarioLogado: Usuarios = {} as Usuarios;
  constructor(private apiBlog: BlogService) { }



  ngOnInit(): void {
    this.pegarInfos();
    this.usuarioLogado = JSON.parse(localStorage.getItem('user') as string);
  }

  pegarInfos(): void {
    this.apiBlog.getAllUsuarios().subscribe((resp) => {
      this.usuarios = resp
      this.apiBlog.getAllBlog().subscribe((data) => {
        this.blog = data
      })
    })
  }

  converteData(data: string): string {
    return data.split('T')[0].trim().split('-').reverse().join('/')
  }

  findAutor(id: number): string {
      for (let autor of this.usuarios) {
        if(autor.id == id){
          return autor.username
        }
      }

      return ''
    }



}
