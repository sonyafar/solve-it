import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HalleyMethodComponent } from './halley-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGgistModule } from 'ngx-ggist';



@NgModule({
  declarations: [
    HalleyMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGgistModule
  ],
  exports: [
    HalleyMethodComponent
  ]
})
export class HalleyMethodModule { }
