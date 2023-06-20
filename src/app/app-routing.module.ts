import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './component/crud/crud.component';
// import { MenuLateralComponent } from './component/menu-lateral/menu-lateral.component';
import { BlogHomeComponent } from './component/blog/blog-home/blog-home.component';
import { BlogInternaComponent } from './component/blog/blog-interna/blog-interna.component';
import { CriarPostComponent } from './component/blog/criar-post/criar-post.component';
import { PerfilComponent } from './component/blog/perfil/perfil.component';
import { LoginComponent } from './component/blog/login/login.component';
import { RegisterComponent } from './component/blog/register/register.component';
import { DepartamentosComponent } from './component/cms/departamentos/departamentos.component';
import { ProdutosComponent } from './component/cms/produtos/produtos.component';
import { ListaComponent } from './component/cms/shared/lista/lista.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // Cada Cada objeto tem as propriedade de path para o caminho e
  // component para indicar que a componente sera carregado neste caminho
  // {path: 'menu-lateral', component: MenuLateralComponent},
  {path: 'crud', component: CrudComponent},
  {path: 'departamentos', component: DepartamentosComponent},
  {path: 'lista', component: ListaComponent},
  {path: 'blog/home', component: BlogHomeComponent, canActivate: [AuthGuard]},
  {path: 'blog/interna/:id', component: BlogInternaComponent},
  {path: 'blog/criar', component: CriarPostComponent},
  {path: 'blog/perfil/:id', component: PerfilComponent},
  {path: 'blog/login', component: LoginComponent},
  {path: 'blog/register', component: RegisterComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
