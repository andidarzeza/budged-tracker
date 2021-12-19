import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartOptions } from '../models/ChartOptions';

@Injectable({
    providedIn: 'root'
})
export class ChartUtils {
    public createChart(context: string, options: ChartOptions): Chart {
        return new Chart(context, {
            type: options.type,
            data: {
                labels: options.labels,
                datasets: options.datasets
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        display: options.showGridLines
                    },
                    x: {
                        display: options.showGridLines
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });;
    }
}