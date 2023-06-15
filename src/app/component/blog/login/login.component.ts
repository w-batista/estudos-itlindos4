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
    login: '',
    senha: '',
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
      login: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  acessarLogin(): void {
    
    const entrarLogin = {
      login: this.formPost.value.login,
      senha: this.formPost.value.senha
    }
    let usuarios: Usuarios[] = []

    this.apiBlog.getAllUsuarios().subscribe((data) => {
      usuarios = data
    })

    setTimeout(() => {
      console.log('usuários',usuarios)

      //let logado = false
      console.log('valores', entrarLogin)

      /*for (let index = 0; index < usuarios.length; index++) {

        const usuario = usuarios[index];

        if(usuario.login === entrarLogin.login && usuario.senha === entrarLogin.senha){
          console.log('passei no IF')
          logado = true
          break;
        }
        else {
          logado = false
        }
        
      }
      
      console.log('logado', logado)*/

      const test = (user: Usuarios)=> {
        return user.login == entrarLogin.login && user.senha == entrarLogin.senha;
      }

      const usuario = usuarios.find(((user)=> {
        return user.login == entrarLogin.login && user.senha == entrarLogin.senha;
      }))

      if(usuario){
        localStorage.setItem('user', JSON.stringify(usuario))

        const user = JSON.parse(localStorage.getItem('user') as string)

        console.log('usuario localstorage',user)
      }
      else{
        console.error('Usuário ou senha inválido!')
      }

      //console.log('logado', logado)

    }, 3000);
  } 



}
