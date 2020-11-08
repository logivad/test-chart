import { Component } from '@angular/core';
import { BarChartItem } from './bar-chart/bar-chart.component';

const dataSets: Array<Array<BarChartItem>> = [
    [
        { title: 'Open', x: 96000, y: 100000 },
        { title: 'Delete', x: 42800, y: 90000, preferDecrease: true },
        { title: 'Close', x: 80000, y: 76000, preferDecrease: true },
        { title: 'Create', x: 112000, y: 120000 },
        { title: 'Stat', x: 1176000, y: 1000000 },
    ],
    [
        { title: 'Open', x: 1500, y: 1000 },
        { title: 'Delete', x: 1700, y: 1200 },
        { title: 'Open', x: 2000, y: 1800, preferDecrease: true },
        { title: 'Close', x: 2500, y: 2000 },
        { title: 'Create', x: 2000, y: 3000 },
    ],

    [
        { title: 'Open', x: 10, y: 11 },
        { title: 'Close', x: 100, y: 110 },
        { title: 'Delete', x: 1000, y: 1100 },
        { title: 'Create', x: 10000, y: 10100 },
        { title: 'Stat', x: 100000, y: 100100 },
    ],
    [
        { title: 'Delete', x: 100100, y: 100000 },
        { title: 'Stat', x: 10100, y: 10000 },
        { title: 'Open', x: 1100, y: 1000 },
        { title: 'Create', x: 110, y: 100 },
        { title: 'Close', x: 11, y: 10 },
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
