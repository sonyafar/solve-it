import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from 'src/app/models/data.model';
import { all, create } from 'mathjs';
import * as _ from 'lodash';
import { faArrowRotateForward, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ChartService } from '../../shared/services/chart.service';
var derivative = require('math-diff');

@Component({
  selector: 'app-halley-method',
  templateUrl: './halley-method.component.html',
  styleUrls: ['./halley-method.component.css'],
  providers: []
})
export class HalleyMethodComponent implements OnInit {

  @ViewChild('inputForm') form: any;

  input: Data = {
    equation: 'x-cos(x)',
    startPoint: 2,
    error: 0.0001,
    maxStep: 100
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
    let x1 = 0;
    let N = this.input.maxStep ?? 100;

    let epsilon = this.input.error ?? 0.0001;

    let index = 1;

    let f_x0 = 0;

    let f_x0_1st_deriviate = 0;
    let f_x0_2nd_deriviate = 0;

    let f_1st_deriviate = derivative(this.input.equation, 'x').toString();
    let f_2nd_deriviate = derivative(f_1st_deriviate, 'x').toString();

    if(x0 != undefined) {
      if(this.function(x0) == 0.0) return x0;

      do
      {
        f_x0 = this.function(x0);
        f_x0_1st_deriviate = this.math.evaluate(f_1st_deriviate ?? 'x', {x : x0});
        f_x0_2nd_deriviate = this.math.evaluate(f_2nd_deriviate ?? 'x', {x : x0});

        let temp = 2 * Math.pow(f_x0_1st_deriviate, 2) - f_x0 * f_x0_2nd_deriviate;

        if(temp == 0) throw new Error('DivideByZeroException');

        x1 = x0 - (2 * f_x0 * f_x0_1st_deriviate)/(temp);

        this.result.push({
          index: index,
          x0: _.round(x0, 3),
          f_x0: _.round(f_x0, 3),
          f_x0_1st_deriviate: _.round(f_x0_1st_deriviate, 3),
          f_x0_2nd_deriviate: _.round(f_x0_2nd_deriviate, 3),
          x1: _.round(x1, 3),
        });
        
        x0 = x1;
        index = index + 1;

        if(index > N) throw new Error('MaxIterationsExceededException');
      } 
      while (Math.abs(this.function(x1)) > epsilon);
    }

    return _.round(x1, 3);
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
