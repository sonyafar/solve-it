import { Injectable } from "@angular/core";
import { Chart, registerables } from 'chart.js';
import * as _ from 'lodash';
import { all, create } from 'mathjs';

export interface DataCase {
  x?: number[],
  y?: number[],
  const?: number[]
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ChartService {

  public canvas: any;

  public ctx: any;

  public chart: any;

  public dataCase: DataCase = {};
    
  constructor() {}

createChart(eq: any, chartName: string, x1: number, x2: number) {

    Chart.register(...registerables);
    
    this.canvas = document.getElementById(chartName);

    this.ctx = this.canvas.getContext('2d');

    this.dataCase = this.prepareDataCaseForChart(eq, x1, x2);

    let data = {
      label: this.dataCase.x,
      datasets: [
        {
          data: this.dataCase.y,
          borderColor: 'black',
          borderWidth: 2,
          backgroundColor: 'white',
          borderDash: [5,2]
        }
      ],
    };

    let config: any = {
      type: 'line',
      data: data
    }

    this.chart = new Chart(this.ctx, config);

    return this.chart;
  }



  resetChartZoom(chart: any): void {
    chart.resetZoom();
  }

  prepareDataCaseForChart(eq: any, x1: number, x2: number): DataCase {
    let x_arr = [];
    let y_arr = [];
    let const_y = [];

    let dx = 0.1;

    for(let x = x1; x <= x2; x = x + dx) {
      x_arr.push(_.round(x, 1));
      y_arr.push(this.evaluate(eq, x)); 
    }

    const_y = [...Array(x_arr.length).fill(0)];

    let datacase: DataCase = {
      x: x_arr,
      y: y_arr,
      const: const_y,
    };

    return datacase;
  }

  evaluate(eq: string, x: number): number {
    const math = create(all);
    const result = math.evaluate(eq ?? 'x', {x : x})

    return result;
  }


  destroyChart(chartName: string): void {
    Chart.getChart(chartName)?.destroy();
  }

}