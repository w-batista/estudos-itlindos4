import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../service/usuarios.service';
import { Usuarios } from '../model/usuarios';
import { Blog } from '../model/blog';
import { BlogService } from '../service/blog.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formPost: FormGroup;

  user: Usuarios = {
    username: '',
    pfp: '',
    resumo: '',
    postagens: [],
    id: 0
  };

  blog: Blog = {
    titulo: '',
    data: '',
    texto: '',
    imagem: '',
    autor: 0,
    comentarios: [],
    id: 0
  };

  constructor(private apiBlog: BlogService
  ) {
    this.formPost = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      pfp: new FormControl(''),
      resumo: new FormControl(''),
      id: new FormControl(),

    })
  }

  acessarLogin(): void {
    console.log(this.formPost)
    let entrarLogin: Usuarios = {
      username: this.formPost.value.username,
      pfp: '',
      resumo: '',
      postagens: [],
      id: 0
    }
    this.apiBlog.getAllUsuarios().subscribe((data) => {
      return ''
    })
  }

}
