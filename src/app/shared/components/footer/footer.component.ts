import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @ViewChild('popup') popup?: ElementRef;;
  
  constructor() {}

  showPopup() {
    this.popup?.nativeElement.classList.toggle('active');
  }

  hidePopup() {
    this.popup?.nativeElement.classList.remove('active');
  }

  closeOnOutsideClick() {
    console.log('outside')
  }
}
