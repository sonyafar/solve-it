import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from 'src/app/models/data.model';
import { all, create } from 'mathjs';
import * as _ from 'lodash';
import { faArrowRotateForward, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ChartService } from '../../shared/services/chart.service';
var derivative = require('math-diff');

@Component({
  selector: 'app-newton-method',
  templateUrl: './newton-method.component.html',
  styleUrls: ['./newton-method.component.css'],
  providers: []
})
export class NewtonMethodComponent implements OnInit {

  @ViewChild('inputForm') form: any;

  input: Data = {
    equation: '3x - cos(x) -1',
    error: 0.00001,
    startPoint: 2,
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
        this.checkGuess();
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

    let index = 1;
    let epsilon = this.input.error ?? 0.0001;

    if(x0 != undefined) {
      if(this.function(x0) == 0.0) return x0;

      do
      {
        let f_x0 = this.function(x0);

        if(this.deriviate(x0) == 0) throw new Error('DivideByZeroException');

        x1 = x0 - f_x0 / this.deriviate(x0);

        let f_x1 = this.function(x1);

        this.result.push({
          index: index,
          x0: _.round(x0, 3),
          f_x0: _.round(f_x0, 3),
          x1: _.round(x1, 3),
          f_x1: _.round(f_x1, 3)
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


  deriviate(x: number): number {
    var temp =  derivative(this.input.equation, 'x').toString();
    return this.math.evaluate(temp, {x : x});
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

  checkGuess() {
    if(this.input.startPoint && this.input.endPoint) {
      if(!(this.function(this.input.startPoint) == 0 && this.deriviate(this.input.startPoint) != 0))
      throw new Error('InvalidGuessException');
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
      case 'InvalidGuessException': {
        this.warning = "Given is not twice continuously differentiable in some interval about a point x0. " + 
        "Try again with different guess.";
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
