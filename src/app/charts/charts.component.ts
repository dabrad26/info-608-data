import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements AfterViewInit {
  allData;
  scaleData;

  constructor(
    private router: Router
  ) { }

  ngAfterViewInit() {
    fetch('/assets/data.json').then(response => response.json()).then(data => {
      this.allData = data;
      this.setupCharts();
    });
  }

  setupCharts() {
    const scaleChartDom = document.getElementById('scale-chart');
    this.scaleData = new Chart(scaleChartDom, {
      type: 'line',
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            },
            scaleLabel: {
              labelString: 'Day',
              display: true
            }
          }],
          yAxes: [{
            ticks: {
              max: 5,
              min: 1,
              stepSize: 1
            },
            scaleLabel: {
              labelString: 'Overall Happiness (1: sad, 5: happy)',
              display: true
            }
          }]
        }
      },
      data: {
        datasets: [{
          label: 'Happiness Scale',
          fill: false,
          borderColor: 'blue',
          data: this.allData.map(data => {
            return {
              t: new Date(data.date),
              y: data.scale,
            };
          }),
        }, {
          label: 'Got outside',
          fill: false,
          type: 'bar',
          backgroundColor: 'rgba(255,0,0, .3)',
          fillOpacity: .3,
          data: this.allData.map(data => {
            return {
              t: new Date(data.date),
              y: data.got_outside ? 5 : 0
            };
          }),
        }],
      }
    });
  }


  viewCodes(event) {
    event.preventDefault();
    this.router.navigate([`/codes`]);
  }

  goHome(event) {
    event.preventDefault();
    this.router.navigate([`/`]);
  }

}
