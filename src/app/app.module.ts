import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// TODA VEZ QUE UTILIZAR O SERVICE É NECESSÁRIO O HTTPCLIENTMODULE
// MODULE DE API
import { HttpClientModule } from '@angular/common/http';
// MODULE DO NGMODEL
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { CrudComponent } from './component/crud/crud.component';
import { MenuLateralComponent } from './component/menu-lateral/menu-lateral.component';
import { BlogHomeComponent } from './component/blog/blog-home/blog-home.component';
import { BlogInternaComponent } from './component/blog/blog-interna/blog-interna.component';
import { CriarPostComponent } from './component/blog/criar-post/criar-post.component';
import { PerfilComponent } from './component/blog/perfil/perfil.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/blog/login/login.component';
import { RegisterComponent } from './component/blog/register/register.component';
// import { CmsComponent } from './component/cms/cms.component';
import { DepartamentosComponent } from './component/cms/departamentos/departamentos.component';
import { ProdutosComponent } from './component/cms/produtos/produtos.component';
import { ListaComponent } from './component/cms/shared/lista/lista.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    MenuLateralComponent,
    BlogHomeComponent,
    BlogInternaComponent,
    CriarPostComponent,
    PerfilComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    // CmsComponent,
    DepartamentosComponent,
    ProdutosComponent,
    ListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
