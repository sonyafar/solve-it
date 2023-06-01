import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from 'src/app/models/data.model';
import { all, create } from 'mathjs';
import * as _ from 'lodash';
import { faArrowRotateForward, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ChartService } from '../../shared/services/chart.service';
var derivative = require('math-diff');

@Component({
  selector: 'app-false-postion-method',
  templateUrl: './false-postion-method.component.html',
  styleUrls: ['./false-postion-method.component.css'],
  providers: []
})
export class FalsePositionMethodComponent implements OnInit {

  @ViewChild('inputForm') form: any;

  input: Data = {
    equation: 'x-cos(x)',
    startPoint: -10,
    endPoint: 3,
    error: 0.0001,
    maxStep: 100,
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

  getResult(): number {
    let x0 = this.input.startPoint;
    let x1 = this.input.endPoint;
    let N = this.input.maxStep ?? 100;

    let index = 1;
    let x2 = 0;

    let f_x0 = 0;
    let f_x1 = 0;
    let f_x2 = 0;

    let epsilon = this.input.error ?? 0.0001;

    if((x0 != undefined) && (x1 != undefined)) {
      if(this.function(x0) == 0.0) return x0;
      if(this.function(x1) == 0.0) return x1;

      do {
        f_x0 = this.function(x0);
        f_x1 = this.function(x1);

        if(f_x0 == f_x1) throw new Error("Divide by zero error!");

        x2 = x0 - (x1 - x0) * f_x0 / (f_x1 - f_x0);

        f_x2 = this.function(x2);

        this.result.push({
          index: index,
          x0: _.round(x0, 4),
          x1: _.round(x1, 4),
          x2: _.round(x2, 4),
          f_x2: _.round(f_x2, 4),
        });

        if (this.function(x0) * this.function(x2) < 0)  x1 = x2;
        else x0 = x2;

        index = index + 1;

        if(index > N) throw new Error('MaxIterationsExceededException');
      } 
      while (Math.abs(f_x2) > epsilon);
    }

    return _.round(x2, 4);
  }

  function(x: number): number {
    return this.math.evaluate(this.input.equation ?? 'x', {x : x});
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
