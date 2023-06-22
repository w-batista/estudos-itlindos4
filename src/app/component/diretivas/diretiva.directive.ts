import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Directive({
  selector: '[aplicaFundo]'
})
export class DiretivaDirective implements OnInit {



  @HostBinding('style.backgroundColor') corFundo: string = 'red'
  @HostBinding('disabled') disabled: boolean = true

  @HostListener('click', ['$event.target']) 
    clickDiv(evento: any){
      const elem = this.elemento.nativeElement as HTMLDivElement;

      elem.classList.remove('active');
    }

  @HostListener('mouseover') passarOMouse() {
    this.corFundo = 'black'
  }

  @HostListener('mouseout') tirarOMouse() {
    this.corFundo = 'white'
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



}
