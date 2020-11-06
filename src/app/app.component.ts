import { Component } from '@angular/core';
import { BarChartItem } from './bar-chart/bar-chart.component';

const dataSets: Array<Array<BarChartItem>> = [
    [
        { x: 96000, y: 100000 },
        { x: 42800, y: 90000, preferDecrease: true },
        { x: 80000, y: 76000, preferDecrease: true },
        { x: 112000, y: 120000 },
        { x: 1176000, y: 1000000 },
    ],
    [
        { x: 9, y: 10 },
        { x: 90, y: 100 },
        { x: 900, y: 1000 },
        { x: 9900, y: 10000 },
        { x: 99000, y: 100000 },
    ],
    [
        { x: 100000, y: 100100 },
        { x: 10000, y: 10100 },
        { x: 1000, y: 1100 },
        { x: 100, y: 110 },
        { x: 10, y: 11 },
    ],
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public height = 300;
    public logarithmicScale = true;
    public chartData: Array<BarChartItem> = dataSets[0];
    public dataSets = dataSets;
}
