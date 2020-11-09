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
        { title: 'Open', x: 100000, y: 100100 },
        { title: 'Delete', x: 200000, y: 200100 },
        { title: 'Open', x: 300000, y: 300100, preferDecrease: true },
        { title: 'Close', x: 400000, y: 400100 },
        { title: 'Create', x: 500000, y: 500100 },
    ],

    [
        { title: 'Open', x: 9, y: 10 },
        { title: 'Close', x: 99, y: 100 },
        { title: 'Delete', x: 900, y: 1000 },
        { title: 'Create', x: 9000, y: 10000 },
        { title: 'Stat', x: 99000, y: 100000 },
    ],
    [
        { title: 'Stat', x: 99000, y: 100000 },
        { title: 'Create', x: 9000, y: 10000 },
        { title: 'Delete', x: 900, y: 1000 },
        { title: 'Close', x: 99, y: 100 },
        { title: 'Open', x: 9, y: 10 },
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
