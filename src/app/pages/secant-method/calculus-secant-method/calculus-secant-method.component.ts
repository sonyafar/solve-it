import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-calculus-secant-method',
  templateUrl: './calculus-secant-method.component.html',
  styleUrls: ['./calculus-secant-method.component.css'],
  providers: [ GlobalService]
})
export class CalculusSecantMethodComponent implements OnChanges, OnInit {

  content: string = '$$x_2 = x_1 - f(x_1) \\cdot \\frac{(x_1 - x_0)}{f(x_1) - f(x_0)} $$';
  mathJaxObject: any; 

  constructor(private gs:GlobalService) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {}
}
