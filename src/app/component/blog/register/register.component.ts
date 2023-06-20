import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuarios } from '../model/usuarios';
import { UsuariosService } from '../service/usuarios.service';
import { Blog } from '../model/blog';
import { BlogService } from '../service/blog.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formPost: FormGroup;

  blog: Blog = {
    titulo: '',
    data: '',
    texto: '',
    imagem: '',
    autor: 0,
    comentarios: [],
    id: 0
  };

  user: Usuarios = {
    username: '',
    pfp: '',
    login: '',
    senha: '',
    resumo: '',
    postagens: [],
    id: 0
  }

  posts: Blog[] = []
  users: Usuarios[] = [];

  idDoAutor: number = 0;

  constructor(
    private apiUsuarios: UsuariosService
  ) {
    this.formPost = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      resumo: new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(400)]),
      pfp: new FormControl('')
    }, this.validatePassword)
  }

  validatePassword(form: AbstractControl): {[ct: string]: boolean} | null {

    const pw = form.get('password') as FormControl
    const cpw = form.get('confirmPassword') as FormControl

    if(pw.value !== cpw.value){
      return {passwordInvalido: true}
    }
    return null
  }

  ngOnInit(): void {
    this.pegarInfos();
  }

  pegarInfos(): void{
    this.apiUsuarios.getAllUsuarios().subscribe((data) => {
      this.users = data
    })
  }

  criarUser(): void{
    let novoUsuario: Usuarios = {
      username: this.formPost.value.username,
      pfp: this.formPost.value.pfp,
      resumo: this.formPost.value.resumo,
      login: '',
      senha: '',
      postagens: [],
      id: 0
    }
    for( let user of this.users){
      if( user.login === this.formPost.value.login){
        alert( 'Username já cadastado' )
        return
      }
    }
    this.apiUsuarios.postNovoUser(novoUsuario).subscribe((data)=> {
      alert ('User cadastrado')
    })
  }





}
