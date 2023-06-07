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


  blog: Blog[] = [];

  usuarios: Usuarios[] = [];


  constructor(private apiBlog: BlogService) { }



  ngOnInit(): void {
    this.pegarInfos();
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
