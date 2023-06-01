import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { ClickOutsideDirectiveModule } from '../../directive/click-outside.module';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    ClickOutsideDirectiveModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
