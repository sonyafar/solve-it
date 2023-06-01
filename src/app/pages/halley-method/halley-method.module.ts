import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HalleyMethodComponent } from './halley-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGistModule } from '@ekkolon/ngx-gist';



@NgModule({
  declarations: [
    HalleyMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGistModule
  ],
  exports: [
    HalleyMethodComponent
  ]
})
export class HalleyMethodModule { }
