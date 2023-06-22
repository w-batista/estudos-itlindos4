import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Directive({
  selector: '[aplicaFundo]'
})
export class DiretivaDirective implements OnInit {



  @HostBinding('style.backgroundColor') corFundo: string = 'red'
  @HostBinding('style.fontFamily') fontFamily : string = '200px'
  @HostBinding('disabled') disabled: boolean = true

  @HostListener('click', ['$event.target']) clickDiv(evento: any){
      const elem = this.elemento.nativeElement as HTMLDivElement;

      elem.classList.remove('active');

      this.adicionarDivFilho()
    }
 

  
  constructor(private elemento: ElementRef) { }


  ngOnInit(): void {
    console.log('elemento',this.elemento.nativeElement)
    const elem = this.elemento.nativeElement as HTMLDivElement;

    setTimeout(() => {
      elem.classList.add('active')      
    }, 3000);

    setTimeout(() => {
      this.corFundo = 'yellow'
      
    }, 2000);
  }

  adicionarDivFilho(){
    //Elemento com a diretiva - No caso a DIV
    const elemDiv = this.elemento.nativeElement as HTMLDivElement;

    //Cria um novo elemento DIV
    const divNova = document.createElement('div') as HTMLDivElement

    //Adiciona o elemento novo DIV
    elemDiv.append(divNova)
  }

  @HostListener('mouseover') passarOMouse() {
    this.corFundo = 'black'
  }

  @HostListener('mouseout') tirarOMouse() {
    this.corFundo = 'white'
  }


}
