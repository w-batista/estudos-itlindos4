import { Component } from '@angular/core';
import { Produtos } from 'src/app/model/produtos';
import { CmsService } from 'src/app/service/cms.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent {

  prod: Produtos [] = []

constructor (private apiUrl: CmsService) {

}
ngOnInit(){
  this.getProduto()
}
  getProduto(): void {
    this.apiUrl.getAllProduto().subscribe((data) => {
      this.prod = data
    })
  }

}
