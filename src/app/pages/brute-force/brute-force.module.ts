import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BruteForceComponent } from './brute-force.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGgistModule } from 'ngx-ggist';
import { CalculusBruteForceComponent } from './calculus-brute-force/calculus-brute-force.component';



@NgModule({
  declarations: [
    BruteForceComponent,
    CalculusBruteForceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGgistModule
  ],
  exports: [
    BruteForceComponent
  ]
})
export class BruteForceModule { }
