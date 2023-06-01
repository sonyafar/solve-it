import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from 'src/app/models/data.model';
import { all, create } from 'mathjs';
import * as _ from 'lodash';
import { faArrowRotateForward, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ChartService } from '../../shared/services/chart.service';
var derivative = require('math-diff');

@Component({
  selector: 'app-ridders-method',
  templateUrl: './ridders-method.component.html',
  styleUrls: ['./ridders-method.component.css'],
  providers: []
})
export class RiddersMethodComponent implements OnInit {

  @ViewChild('inputForm') form: any;

  input: Data = {
    equation: '2x^3-2x-5',
    startPoint: -2,
    endPoint: 4,
    error: 0.0001,
    maxStep: 1000,
  }

  result: any[] = []

  root?: number;

  isDataSubmit: boolean = false;
  isWarningShown: boolean = false;

  warning: string = '';

  faArrowRotateForward = faArrowRotateForward;
  faPlay = faPlay;

  math = create(all);

  constructor(private viewportScroller: ViewportScroller, 
    private chartService: ChartService) {}

  ngOnInit(): void {}

  goToSection(anchor: string) {
    this.viewportScroller.scrollToAnchor(anchor);
  }

  calculate() {
    this.isWarningShown = false;
    this.result = [];
    this.warning = '';
    
    this.validate();

    if(this.form.valid) {
      try {
        this.checkRange();
        this.root = this.getResult();
      }
      catch(error) {
        this.handleError(error);
        console.log(error);
      }
    }
  }

  // getResult() {
  //   let x0 = this.specifyRange(this.input.startPoint ?? -2, this.input.endPoint ?? 1);
  //   // let x0 = this.input.startPoint;
  //   let x1, x2, x3 = 0;
  //   let N = this.input.maxStep;
  //   let index = 1;
  //   let epsilon = this.input.error ?? 0.0001;

  //   let y0, y1, y2, y3, s = 0;

  //   if(x0 && N) {
  //     x1 = x0 + 1;
  //     do {
  //       x2 = 0.5 * (x0 + x1);

  //       y0 = this.function(x0);
  //       y1 = this.function(x1);
  //       y2 = this.function(x2);

  //       s = Math.sqrt(Math.pow(y2, 2) - y0 * y1);
  //       if(s == 0) throw new Error("Divide by zero error!");

  //       if(y0 < y1)  x3 = x2 - (x2 - x0) * y2 / s;
  //       else  x3 = x2 + (x2 - x0) * y2 / s;

  //       y3 = this.function(x3);

  //       this.result.push({
  //         index: index,
  //         x0: _.round(x0, 3),
  //         y0: _.round(y0, 3),
  //         x1: _.round(x1, 3),
  //         y1: _.round(y1, 3),
  //         x2: _.round(x2, 3),
  //         y2: _.round(y2, 3),
  //         x3: _.round(x3, 3),
  //         y3: _.round(y3, 3)
  //       });

  //       x0 = x2;
  //       x1 = x3;
  //       index = index + 1;

  //       if(index > N) throw new Error('MaxIterationsExceededException');
  //     } 
  //     while (Math.abs(y3) > epsilon);
  //   }

  //   this.root = _.round(x3, 3);
  // }

  // getResult(): number {
  //   let x0 = this.input.startPoint;
  //   let x2 = this.input.endPoint;
  //   let dx, x1, x3 = 0;
  //   let N = this.input.maxStep;
  //   let index = 1;
  //   let epsilon = this.input.error ?? 0.0001;

  //   let y0, y1, y2, y3, s = 0;

  //   if(x0 && x2 && N) {
  //     y0 = this.function(x0);
  //     y2 = this.function(x2);

  //     if(y0 == epsilon) return x0;
  //     if(y2 == epsilon) return x2;

  //     do {
  //       x1 = 0.5 * (x0 + x2); // a middle point
  //       y1 = this.function(x1);

  //       s = Math.sqrt(Math.pow(y1, 2) - y0 * y2);
  //       if(s == 0) throw new Error("Divide by zero error!");

  //       dx = (x1 - x0) * y1 / s;

  //       if((y0 - y2) < 0) dx = -dx;

  //       x3 = x1 + dx; // a temp point
  //       y3 = this.function(x3);

  //       this.result.push({
  //         index: index,
  //         x0: _.round(x0, 3),
  //         y0: _.round(y0, 3),
  //         x1: _.round(x1, 3),
  //         y1: _.round(y1, 3),
  //         x2: _.round(x2, 3),
  //         y2: _.round(y2, 3),
  //         x3: _.round(x3, 3),
  //         y3: _.round(y3, 3)
  //       });

  //       if (Math.sign(y1) == Math.sign(y3)) {
  //         if(Math.sign(y0)!= Math.sign(y3)) 
  //         {
  //           x2 = x3;
  //           y2 = y3;
  //         }
  //         else {
  //           x0 = x3;
  //           y0 = y3;
  //         }
  //       }
  //       else {
  //         x0 = x1; 
  //         x2 = x3;
  //         y0 = y1;
  //         y2 = y3;
  //       }

  //       index = index + 1;

  //       if(index > N) throw new Error('MaxIterationsExceededException');
  //     } 
  //     while (Math.abs(y3) > epsilon);
  //   }

  //   console.log(this.function(x3));

  //  return  _.round(x3, 3);
  // }

  getResult(): number {
    let x0 = this.input.startPoint;
    let x2 = this.input.endPoint;
    let dx, x1, x3 = 0;
    let N = this.input.maxStep ?? 100;
    let index = 1;
    let epsilon = this.input.error ?? 0.0001;

    let y0, y1, y2, y3, s = 0;

    if((x0 != undefined) && (x2 != undefined)) {
      y0 = this.function(x0);
      y2 = this.function(x2);

      if(y0 == epsilon) return x0;
      if(y2 == epsilon) return x2;

      do {
        x1 = 0.5 * (x0 + x2); // a middle point

        y0 = this.function(x0);
        y1 = this.function(x1);
        y2 = this.function(x2);

        s = Math.sqrt(Math.pow(y1, 2) - y0 * y2);
        if(s == 0) throw new Error("Divide by zero error!");

        dx = (x1 - x0) * y1 / s;

        if((y0 - y2) < 0) dx = -dx;

        x3 = x1 + dx; // a temp point
        y3 = this.function(x3);

        this.result.push({
          index: index,
          x0: _.round(x0, 3),
          y0: _.round(y0, 3),
          x1: _.round(x1, 3),
          y1: _.round(y1, 3),
          x2: _.round(x2, 3),
          y2: _.round(y2, 3),
          x3: _.round(x3, 3),
          y3: _.round(y3, 3)
        });

        if (Math.sign(y1) == Math.sign(y3)) {
          if(Math.sign(y0)!= Math.sign(y3)) x2 = x3;
          else x0 = x3;
        }
        else {
          x0 = x1; 
          x2 = x3;
        }

        index = index + 1;

        if(index > N) throw new Error('MaxIterationsExceededException');
      } 
      while (Math.abs(y3) > epsilon);
    }

   return  _.round(x3, 3);
  }

  function(x: number): number {
    return this.math.evaluate(this.input.equation ?? 'x', {x : x});
  }

  specifyRange(x0: number, x1: number): number {
    let x = x0
    for(x; x <= x1; x = x + 1) {
      if(this.function(x) * this.function(x + 1)< 0) break;
    }
    return x;
  }

  clean() {
    this.input = {};
    this.result = [];
    this.root = 0;
    this.isDataSubmit = false;
    this.isWarningShown = true;
    this.warning = '';
  }

  validate() {
    if(this.form.valid == false) {
      this.isDataSubmit = true;
    }
  }

  checkRange() {
    if(this.input.startPoint && this.input.endPoint) {
      if(!(this.function(this.input.startPoint) * this.function(this.input.endPoint) < 0))
      throw new Error('OutOfRangeException');
    }
  }

  createChart() {
    this.chartService.createChart(this.input.equation, "chart", this.input.startPoint ?? 0, this.root ?? 2)
  }


  handleError(error: any) {
    switch(error?.toString().replace('Error: ', '')) {
      case 'OutOfRangeException': {
        this.warning = "Given guess values do not bracket the root. Try again with different guess.";
        break;
      }
      case 'DivideByZeroException': {
        this.warning = "Divide by zero error!"
        break;
      }
      case 'MaxIterationsExceededException': {
        this.warning = "Maximum Number of Iterations Exceeded. Try increasing the error value or change given guess values.";
        break;
      }
      case 'InvalidArgument': {
        this.warning = "Expression is wrong! The variable 'x' is expected";
        break;
      }
      default: {
        let temp = undefined;

        if(error?.toString().includes('SyntaxError: ')) {
          temp = error?.toString().replace('SyntaxError: ', '');
        }
        else if(error?.toString().includes('Error: ')) {
          temp = error?.toString().replace('Error: ', '');
        }

        this.warning = temp ?? 'Something went wrong, try again...';
      }
    }

    this.isWarningShown = true;
  }
}
